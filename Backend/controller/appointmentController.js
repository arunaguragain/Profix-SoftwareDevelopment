const Appointment = require('../model/appointment'); 

exports.bookAppointment = async (req, res) => {
  try {
    const { phoneNumber, appointmentDate, appointmentTime, Address, describeProblem } = req.body;

    if (!phoneNumber || !appointmentDate || !appointmentTime || !Address || !describeProblem) {
      return res.status(400).json({ error: "All fields are required" });
    }

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

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ error: "Error fetching appointments" });
  }
};

exports.editAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { phoneNumber, appointmentDate, appointmentTime, Address, describeProblem } = req.body;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

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

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    await appointment.destroy();

    res.status(200).json({
      message: "Appointment deleted successfully!",
    });
  } catch (error) {
    console.error("❌ Error deleting appointment:", error);
    res.status(500).json({ error: "Error deleting appointment" });
  }
};


