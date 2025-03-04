const request = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRoutes = require("../routes/userRoutes");

// Mock Express App
const app = express();
app.use(express.json());
app.use("/users", userRoutes);

// Mock bcrypt
jest.mock("bcryptjs", () => ({
    hash: jest.fn(async (password) => `hashed-${password}`),
    compare: jest.fn(async (password, hash) => hash === `hashed-${password}`),
}));

// Mock JWT
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(() => "mocked-jwt-token"),
    verify: jest.fn((token) => {
        if (token === "valid-token") return { userId: 1 };
        throw new Error("Invalid token");
    }),
}));

// Mock User Model
jest.mock("../model/User", () => ({
    create: jest.fn().mockImplementation(async (data) => ({
        userId: 1,
        fullName: data.fullName,
        email: data.email,
        contact: data.contact,
        address: data.address,
        password: await bcrypt.hash(data.password, 10),
        role: data.role || "user",
    })),
    findOne: jest.fn().mockImplementation(async ({ where }) => {
        if (where.email === "existing@example.com") {
            return {
                userId: 1,
                email: "existing@example.com",
                password: await bcrypt.hash("password123", 10),
                role: "user",
            };
        }
        return null;
    }),
    findByPk: jest.fn().mockImplementation(async (id) => {
        if (id === 1) {
            return {
                userId: 1,
                fullName: "John Doe",
                email: "johndoe@example.com",
                contact: "9800000000",
                address: "Kathmandu, Nepal",
                profilePicture: "profile.jpg",
                save: jest.fn().mockResolvedValue(true),
                destroy: jest.fn().mockResolvedValue(true),
            };
        }
        return null;
    }),
    findAll: jest.fn().mockResolvedValue([
        {
            userId: 1,
            fullName: "John Doe",
            email: "johndoe@example.com",
            contact: "9800000000",
            address: "Kathmandu, Nepal",
            profilePicture: "profile.jpg",
        },
    ]),
}));

describe("✅ User Routes API Tests", () => {
    test("Should register a new user successfully", async () => {
        const response = await request(app).post("/users/register").send({
            fullName: "John Doe",
            email: "newuser@example.com",
            password: "password123",
            contact: "9800000000",
            address: "Kathmandu, Nepal",
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User registered successfully");
    });

    test("Should return 400 if user already exists", async () => {
        const response = await request(app).post("/users/register").send({
            fullName: "John Doe",
            email: "existing@example.com",
            password: "password123",
            contact: "9800000000",
            address: "Kathmandu, Nepal",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User already exists");
    });

    test("Should log in a user and return a token", async () => {
        const response = await request(app).post("/users/login").send({
            email: "existing@example.com",
            password: "password123",
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Login successful");
        expect(response.body).toHaveProperty("token", "mocked-jwt-token");
    });

    test("Should return 400 for incorrect login credentials", async () => {
        const response = await request(app).post("/users/login").send({
            email: "existing@example.com",
            password: "wrongpassword",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid credentials");
    });

    test("Should return 401 if token is missing", async () => {
        const response = await request(app).get("/users/profile");

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Unauthorized");
    });

    test("Should return 401 if trying to update profile without authentication", async () => {
        const response = await request(app).put("/users/profile").send({
            fullName: "John Updated",
        });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Unauthorized");
    });
});
