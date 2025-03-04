const Appointment = require('../model/appointment'); // Adjust the import

/**
 * @desc Book a new appointment
 * @route POST /appointments/book
 */
exports.bookAppointment = async (req, res) => {
  try {
    const { phoneNumber, appointmentDate, appointmentTime, Address, describeProblem } = req.body;

    if (!phoneNumber || !appointmentDate || !appointmentTime || !Address || !describeProblem) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new appointment in the database
    const newAppointment = await Appointment.create({
      phoneNumber,
      appointmentDate,
      appointmentTime,
      Address,
      describeProblem
    });

    res.status(201).json({
      message: "Appointment booked successfully!",
      appointment: newAppointment,
    });
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
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ error: "Error fetching appointments" });
  }
};

/**
 * @desc Edit an appointment
 * @route PUT /appointments/:id
 */
exports.editAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { phoneNumber, appointmentDate, appointmentTime, Address, describeProblem } = req.body;

    // Check if the appointment exists
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Update the appointment details
    appointment.phoneNumber = phoneNumber || appointment.phoneNumber;
    appointment.appointmentDate = appointmentDate || appointment.appointmentDate;
    appointment.appointmentTime = appointmentTime || appointment.appointmentTime;
    appointment.Address = Address || appointment.Address;
    appointment.describeProblem = describeProblem || appointment.describeProblem;

    await appointment.save();

    res.status(200).json({
      message: "Appointment updated successfully!",
      appointment,
    });
  } catch (error) {
    console.error("❌ Error updating appointment:", error);
    res.status(500).json({ error: "Error updating appointment" });
  }
};

/**
 * @desc Delete an appointment
 * @route DELETE /appointments/:id
 */
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the appointment exists
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Delete the appointment
    await appointment.destroy();

    res.status(200).json({
      message: "Appointment deleted successfully!",
    });
  } catch (error) {
    console.error("❌ Error deleting appointment:", error);
    res.status(500).json({ error: "Error deleting appointment" });
  }
};
