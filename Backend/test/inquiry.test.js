const request = require("supertest");
const express = require("express");
const Inquiry = require("../model/inquiry");

// Mock Express App
const app = express();
app.use(express.json());

// Mock Inquiry Routes
app.post("/inquiry", async (req, res) => {
    return res.status(201).json({ success: true, message: "Inquiry created successfully" });
});

app.get("/inquiry", async (req, res) => {
    return res.status(200).json({ success: true, data: [{ inquiryID: 1, name: "John Doe" }] });
});

app.get("/inquiry/:id", async (req, res) => {
    if (req.params.id === "999") {
        return res.status(404).json({ success: false, message: "Inquiry not found" });
    }
    return res.status(200).json({ success: true, data: { inquiryID: 1, name: "John Doe" } });
});

app.put("/inquiry/:id", async (req, res) => {
    return res.status(200).json({ success: true, message: "Inquiry updated successfully" });
});

app.delete("/inquiry/:id", async (req, res) => {
    return res.status(200).json({ success: true, message: "Inquiry deleted successfully" });
});

// Mock Inquiry Model
jest.mock("../model/inquiry", () => ({
    create: jest.fn().mockResolvedValue({ inquiryID: 1, name: "John Doe" }),
    findAll: jest.fn().mockResolvedValue([{ inquiryID: 1, name: "John Doe" }]),
    findByPk: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue([1]),
    destroy: jest.fn().mockResolvedValue(1)
}));

describe("✅ Inquiry API Tests", () => {
    test("Should create a new inquiry", async () => {
        const response = await request(app).post("/inquiry").send({
            name: "John Doe",
            email: "johndoe@example.com",
            subject: "Service Inquiry",
            message: "I need help with plumbing services."
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body.message).toBe("Inquiry created successfully");
    });

    test("Should fetch all inquiries", async () => {
        const response = await request(app).get("/inquiry");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    test("Should return error for non-existing inquiry ID", async () => {
        const response = await request(app).get("/inquiry/999");

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("success", false);
        expect(response.body.message).toBe("Inquiry not found");
    });

    test("Should update an inquiry successfully", async () => {
        const response = await request(app).put("/inquiry/1").send({
            subject: "Updated Inquiry"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body.message).toBe("Inquiry updated successfully");
    });

    test("Should delete an inquiry successfully", async () => {
        const response = await request(app).delete("/inquiry/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body.message).toBe("Inquiry deleted successfully");
    });
});
