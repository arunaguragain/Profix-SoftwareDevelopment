const request = require("supertest");
const express = require("express");
const ServiceProvider = require("../model/ServiceproviderRegistration");

// Mock Express App
const app = express();
app.use(express.json());

// Mock Service Provider Registration Route
app.post("/serviceproviders", async (req, res) => {
    const { fullName, address, email, contact, password } = req.body;

    // Check for missing required fields
    if (!fullName || !address || !email || !contact || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    return res.status(201).json({ success: true, message: "Service provider registered successfully" });
});


// Mock Service Provider Model
jest.mock("../model/ServiceproviderRegistration", () => ({
    create: jest.fn().mockResolvedValue({
        serviceProviderId: 1,
        fullName: "John Doe",
        address: "Kathmandu, Nepal",
        email: "johndoe@example.com",
        contact: "9800000000",
        password: "hashedpassword",
        profilePicture: "profile.jpg",
    })
}));

describe("✅ Service Provider Registration API Tests", () => {
    test("Should register a service provider successfully", async () => {
        const response = await request(app).post("/serviceproviders").send({
            fullName: "John Doe",
            address: "Kathmandu, Nepal",
            email: "johndoe@example.com",
            contact: "9800000000",
            password: "hashedpassword",
            profilePicture: "profile.jpg",
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body.message).toBe("Service provider registered successfully");
    });

    test("Should fail if required fields are missing", async () => {
        const response = await request(app).post("/serviceproviders").send({
            fullName: "John Doe",
            email: "johndoe@example.com",
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("success", false);
        expect(response.body.message).toBe("All fields are required");
    });
});
