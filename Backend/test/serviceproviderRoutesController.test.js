const request = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const serviceProviderRoutes = require("../routes/serviceproviderregistrationRoutes");

// Mock Express App
const app = express();
app.use(express.json());
app.use("/serviceproviders", serviceProviderRoutes);

// Correct way to mock bcrypt
jest.mock("bcryptjs", () => ({
    hash: jest.fn(async (password) => `hashed-${password}`),
    compare: jest.fn(async (password, hash) => hash === `hashed-${password}`),
}));

// Mock JWT
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(() => "mocked-jwt-token"),
    verify: jest.fn(() => ({ serviceProviderId: 1 })),
}));

// Mock ServiceProvider Model - Move inside jest.mock()
jest.mock("../model/ServiceproviderRegistration", () => {
    const bcrypt = require("bcryptjs"); // Move bcrypt inside jest.mock()

    return {
        create: jest.fn().mockImplementation(async (data) => ({
            serviceProviderId: 1,
            fullName: data.fullName,
            email: data.email,
            contact: data.contact,
            address: data.address,
            password: await bcrypt.hash(data.password, 10),
        })),
        findOne: jest.fn().mockImplementation(async ({ where }) => {
            if (where.email === "existing@example.com") {
                return {
                    serviceProviderId: 1,
                    email: "existing@example.com",
                    password: await bcrypt.hash("password123", 10),
                };
            }
            return null;
        }),
        findByPk: jest.fn().mockImplementation(async (id) => {
            if (id === "1") {
                return {
                    serviceProviderId: 1,
                    fullName: "John Doe",
                    email: "johndoe@example.com",
                    contact: "9800000000",
                    address: "Kathmandu, Nepal",
                    update: jest.fn().mockResolvedValue(true),
                    destroy: jest.fn().mockResolvedValue(true),
                };
            }
            return null;
        }),
        findAll: jest.fn().mockResolvedValue([
            {
                serviceProviderId: 1,
                fullName: "John Doe",
                email: "johndoe@example.com",
                contact: "9800000000",
                address: "Kathmandu, Nepal",
            },
        ]),
    };
});

describe("✅ Service Provider Routes API Tests", () => {
    test("Should register a new service provider successfully", async () => {
        const response = await request(app).post("/serviceproviders/register").send({
            fullName: "John Doe",
            email: "newuser@example.com",
            password: "password123",
            contact: "9800000000",
            address: "Kathmandu, Nepal",
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Registration successful");
        expect(response.body.serviceProvider.email).toBe("newuser@example.com");
    });

    test("Should return 400 if required fields are missing", async () => {
        const response = await request(app).post("/serviceproviders/register").send({
            fullName: "John Doe",
            email: "newuser@example.com",
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("All fields are required");
    });

    test("Should log in a service provider and return a token", async () => {
        const response = await request(app).post("/serviceproviders/login").send({
            email: "existing@example.com",
            password: "password123",
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Login successful");
        expect(response.body).toHaveProperty("token", "mocked-jwt-token");
    });

    test("Should return 401 for incorrect login credentials", async () => {
        const response = await request(app).post("/serviceproviders/login").send({
            email: "existing@example.com",
            password: "wrongpassword",
        });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Invalid credentials");
    });

    test("Should return 404 if service provider does not exist during login", async () => {
        const response = await request(app).post("/serviceproviders/login").send({
            email: "nonexistent@example.com",
            password: "password123",
        });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Service provider not found");
    });

    test("Should fetch all service providers", async () => {
        const response = await request(app).get("/serviceproviders");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].email).toBe("johndoe@example.com");
    });

    test("Should fetch a single service provider by ID", async () => {
        const response = await request(app).get("/serviceproviders/1");

        expect(response.status).toBe(200);
        expect(response.body.email).toBe("johndoe@example.com");
    });

    test("Should return 404 if service provider not found", async () => {
        const response = await request(app).get("/serviceproviders/999");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Service provider not found");
    });

    test("Should update a service provider successfully", async () => {
        const response = await request(app).put("/serviceproviders/1").send({
            fullName: "Updated Name",
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Service provider updated successfully");
    });

    test("Should return 404 if trying to update a non-existent service provider", async () => {
        const response = await request(app).put("/serviceproviders/999").send({
            fullName: "Updated Name",
        });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Service provider not found");
    });

    test("Should delete a service provider successfully", async () => {
        const response = await request(app).delete("/serviceproviders/1");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Service provider deleted successfully");
    });

    test("Should return 404 if trying to delete a non-existent service provider", async () => {
        const response = await request(app).delete("/serviceproviders/999");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Service provider not found");
    });
});
