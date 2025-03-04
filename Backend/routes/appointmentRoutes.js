const express = require("express");
const { bookAppointment, getAppointments } = require("../controller/appointmentController");

const router = express.Router();

router.post("/book", bookAppointment); // Book an appointment
router.get("/", getAppointments); // Get all appointments

module.exports = router;
