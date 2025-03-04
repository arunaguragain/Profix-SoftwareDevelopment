const request = require("supertest");
const express = require("express");
const userRoutes = require("../routes/userRoutes");

// Mock Express App
const app = express();
app.use(express.json());
app.use("/users", userRoutes);

// Correct way to mock bcrypt
jest.mock("bcryptjs", () => ({
    hash: jest.fn(async (password) => `hashed-${password}`),
    compare: jest.fn(async (password, hash) => hash === `hashed-${password}`),
}));

// Mock JWT
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(() => "mocked-jwt-token"),
    verify: jest.fn(() => ({ userId: 1 })),
}));

// Mock User Model - Move inside jest.mock()
jest.mock("../model/User", () => {
    const bcrypt = require("bcryptjs"); // Move bcrypt inside jest.mock()

    return {
        create: jest.fn().mockImplementation(async (data) => {
            if (data.email === "existing@example.com") {
                const error = new Error();
                error.name = "SequelizeUniqueConstraintError"; // Simulate DB unique constraint error
                throw error;
            }
            return {
                userId: 1,
                fullName: data.fullName,
                email: data.email,
                password: await bcrypt.hash(data.password, 10),
                contact: data.contact,
                address: data.address,
                profilePic: "profile.jpg",
            };
        }),
        findOne: jest.fn().mockImplementation(async ({ where }) => {
            if (where.email === "johndoe@example.com") {
                return {
                    userId: 1,
                    email: "johndoe@example.com",
                    password: await bcrypt.hash("password123", 10),
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
                    profilePic: "profile.jpg",
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
                profilePic: "profile.jpg",
            },
        ]),
    };
});

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
        expect(response.body.user.email).toBe("newuser@example.com");
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
            email: "johndoe@example.com",
            password: "password123",
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Login successful");
        expect(response.body).toHaveProperty("token", "mocked-jwt-token");
    });

    test("Should return 401 for incorrect login credentials", async () => {
        const response = await request(app).post("/users/login").send({
            email: "existing@example.com",
            password: "wrongpassword",
        });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid credentials");
    });

    test("Should fetch user profile with valid token", async () => {
        const response = await request(app)
            .get("/users/profile")
            .set("Authorization", "Bearer mocked-jwt-token");

        expect(response.status).toBe(200);
        expect(response.body.email).toBe("johndoe@example.com");
    });

    test("Should return 401 if token is missing", async () => {
        const response = await request(app).get("/users/profile");

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Unauthorized");
    });

    test("Should update user profile successfully", async () => {
        const response = await request(app)
            .put("/users/profile")
            .set("Authorization", "Bearer mocked-jwt-token")
            .send({ fullName: "John Updated" });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Profile updated successfully");
    });

    test("Should return 401 if trying to update profile without authentication", async () => {
        const response = await request(app).put("/users/profile").send({
            fullName: "John Updated",
        });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Unauthorized");
    });

    test("Should delete user account successfully", async () => {
        const response = await request(app)
            .delete("/users/profile")
            .set("Authorization", "Bearer mocked-jwt-token");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Account deleted successfully");
    });

    test("Should return 401 when trying to delete an account without authentication", async () => {
        const response = await request(app).delete("/users/profile");

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Unauthorized");
    });
});
