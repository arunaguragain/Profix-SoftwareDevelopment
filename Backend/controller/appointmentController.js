const { readAppointments, writeAppointments } = require("../model/appointment");

/**
 * @desc Book a new appointment
 * @route POST /appointments/book
 */
exports.bookAppointment = async (req, res) => {
  try {
    const { phone, date, time, address, problem } = req.body;

    if (!phone || !date || !time || !address || !problem) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const appointments = readAppointments();
    const newAppointment = { id: Date.now(), phone, date, time, address, problem };

    appointments.push(newAppointment);
    writeAppointments(appointments);

    res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
  } catch (error) {
    console.error("❌ Error booking appointment:", error);
    res.status(500).json({ error: "Error booking appointment" });
  }
};

/**
 * @desc Get all appointments
 * @route GET /appointments
 */
exports.getAppointments = async (req, res) => {
  try {
    const appointments = readAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ error: "Error fetching appointments" });
  }
};
