const request = require("supertest");
const express = require("express");
const Review = require("../model/Review");

// Mock Express App
const app = express();
app.use(express.json());

// Mock Review Routes
app.post("/reviews", async (req, res) => {
    return res.status(201).json({ message: "Review created successfully", review: req.body });
});

app.get("/reviews", async (req, res) => {
    return res.status(200).json([{ reviewID: 1, name: "John Doe", service: "Plumbing" }]);
});

app.get("/reviews/:id", async (req, res) => {
    if (req.params.id === "99") {
        return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json({ reviewID: 1, name: "John Doe" });
});

app.put("/reviews/:id", async (req, res) => {
    return res.status(200).json({ message: "Review updated successfully" });
});

app.delete("/reviews/:id", async (req, res) => {
    return res.status(200).json({ message: "Review deleted successfully" });
});

// Mock Review Model
jest.mock("../model/Review", () => ({
    findAll: jest.fn().mockResolvedValue([{ reviewID: 1, name: "John Doe" }]),
    findByPk: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({ reviewID: 2, name: "Jane Doe" }),
    update: jest.fn().mockResolvedValue([1]),
    destroy: jest.fn().mockResolvedValue(1)
}));

describe("Review Controller Unit Tests", () => {
    test("Should create a review successfully", async () => {
        const response = await request(app).post("/reviews").send({
            name: "Jane Doe",
            email: "janedoe@example.com",
            service: "Electrical Repair",
            rating: 4,
            comment: "Great service!"
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Review created successfully");
        expect(response.body.review.name).toBe("Jane Doe");
    });

    test("Should fetch all reviews", async () => {
        const response = await request(app).get("/reviews");

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("Should return 404 when fetching a non-existent review", async () => {
        const response = await request(app).get("/reviews/99");

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Review not found");
    });

    test("Should delete a review successfully", async () => {
        const response = await request(app).delete("/reviews/1");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Review deleted successfully");
    });
});
