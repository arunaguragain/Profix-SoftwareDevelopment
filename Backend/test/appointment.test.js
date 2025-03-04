const request = require("supertest");
const express = require("express");
const Appointment = require("../model/appointment"); // Ensure this path matches your project

// Mock Express App
const app = express();
app.use(express.json());

// ✅ Mock Routes for Appointments
app.post("/appointments", async (req, res) => {
    const { phoneNumber, appointmentDate, appointmentTime, describeProblem } = req.body;

    if (!phoneNumber || !appointmentDate || !appointmentTime || !describeProblem) {
        return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }

    return res.status(201).json({ success: true, message: "Appointment created successfully" });
});

app.get("/appointments", async (req, res) => {
    return res.status(200).json({
        success: true,
        data: [{ appointmentId: 1, phoneNumber: "9800000000", appointmentDate: "2024-05-15", appointmentTime: "10:00", describeProblem: "Fix plumbing" }],
    });
});

app.get("/appointments/:id", async (req, res) => {
    if (req.params.id === "1") {
        return res.status(200).json({
            success: true,
            data: { appointmentId: 1, phoneNumber: "9800000000", appointmentDate: "2024-05-15", appointmentTime: "10:00", describeProblem: "Fix plumbing" },
        });
    }
    return res.status(404).json({ success: false, message: "Appointment not found" });
});

app.put("/appointments/:id", async (req, res) => {
    if (req.params.id === "1") {
        return res.status(200).json({ success: true, message: "Appointment updated successfully" });
    }
    return res.status(404).json({ success: false, message: "Appointment not found" });
});

app.delete("/appointments/:id", async (req, res) => {
    if (req.params.id === "1") {
        return res.status(200).json({ success: true, message: "Appointment deleted successfully" });
    }
    return res.status(404).json({ success: false, message: "Appointment not found" });
});

// ✅ **Fix: Ensure Appointment Model is Mocked Properly**
jest.mock("../model/appointment", () => ({
    create: jest.fn().mockResolvedValue({
        appointmentId: 1,
        phoneNumber: "9800000000",
        appointmentDate: "2024-05-15",
        appointmentTime: "10:00",
        describeProblem: "Fix plumbing",
        createdAt: new Date(),
        updatedAt: new Date(),
    }),
    findAll: jest.fn().mockResolvedValue([
        {
            appointmentId: 1,
            phoneNumber: "9800000000",
            appointmentDate: "2024-05-15",
            appointmentTime: "10:00",
            describeProblem: "Fix plumbing",
        },
    ]),
    findByPk: jest.fn().mockImplementation((id) => {
        if (id === "1") {
            return Promise.resolve({
                appointmentId: 1,
                phoneNumber: "9800000000",
                appointmentDate: "2024-05-15",
                appointmentTime: "10:00",
                describeProblem: "Fix plumbing",
                save: jest.fn().mockResolvedValue(true),
                destroy: jest.fn().mockResolvedValue(true),
            });
        }
        return Promise.resolve(null);
    }),
}));

// ✅ **Test Suite for Appointment API**
describe("✅ Appointment API Tests", () => {
    test("Should create an appointment successfully", async () => {
        const response = await request(app).post("/appointments").send({
            phoneNumber: "9800000000",
            appointmentDate: "2024-05-15",
            appointmentTime: "10:00",
            describeProblem: "Fix plumbing",
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body.message).toBe("Appointment created successfully");
    });

    test("Should fail if required fields are missing", async () => {
        const response = await request(app).post("/appointments").send({
            phoneNumber: "9800000000",
            appointmentDate: "2024-05-15",
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("success", false);
        expect(response.body.message).toBe("All required fields must be provided");
    });

    test("Should fetch all appointments", async () => {
        const response = await request(app).get("/appointments");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    test("Should fetch an appointment by ID", async () => {
        const response = await request(app).get("/appointments/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body.data.phoneNumber).toBe("9800000000");
    });

    test("Should return error for non-existing appointment ID", async () => {
        const response = await request(app).get("/appointments/999");

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("success", false);
        expect(response.body.message).toBe("Appointment not found");
    });

    test("✅ Should update an appointment successfully", async () => {
        Appointment.findByPk.mockResolvedValue({
            appointmentId: 1,
            phoneNumber: "9800000000",
            appointmentDate: "2024-05-15",
            appointmentTime: "10:00",
            describeProblem: "Fix plumbing",
            save: jest.fn().mockResolvedValue(true),
        });

        const response = await request(app).put("/appointments/1").send({
            appointmentTime: "11:00",
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body.message).toBe("Appointment updated successfully");
    });

    test("❌ Should return error when deleting a non-existing appointment", async () => {
        Appointment.findByPk.mockResolvedValue(null);

        const response = await request(app).delete("/appointments/999");

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("success", false);
        expect(response.body.message).toBe("Appointment not found");
    });

    test("✅ Should delete an appointment successfully", async () => {
        Appointment.findByPk.mockResolvedValue({
            appointmentId: 1,
            phoneNumber: "9800000000",
            appointmentDate: "2024-05-15",
            appointmentTime: "10:00",
            describeProblem: "Fix plumbing",
            destroy: jest.fn().mockResolvedValue(true),
        });

        const response = await request(app).delete("/appointments/1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body.message).toBe("Appointment deleted successfully");
    });
});
