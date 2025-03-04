import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/MyAppointment.css";

const AppointmentList = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    appointmentDate: "",
    appointmentTime: "",
    Address: "",
    describeProblem: "",
  });

  // ** Fetch appointments from backend **
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/appointments");
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  // Handle delete appointment
  const handleDelete = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const response = await fetch(`http://localhost:5001/api/appointments/${appointmentId}`, { method: "DELETE" });

      if (response.ok) {
        setAppointments(appointments.filter((appointment) => appointment.appointmentId !== appointmentId));
      } else {
        console.error("Failed to delete appointment.");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  // Handle edit appointment (open modal with selected appointment data)
  const handleEdit = (appointment) => {
    console.log("Editing appointment:", appointment);
    setEditingAppointment(appointment);

    setFormData({
      phoneNumber: appointment.phoneNumber || "",
      appointmentDate: appointment.appointmentDate || "",
      appointmentTime: appointment.appointmentTime || "",
      Address: appointment.Address || "",
      describeProblem: appointment.describeProblem || "",
    });
  };

  // Handle input change in edit form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle save changes
  const handleSave = async () => {
    if (!editingAppointment || !editingAppointment.appointmentId) {
      console.error("Error: Editing appointment ID is missing.");
      return;
    }

    const updatedAppointment = {
      phoneNumber: formData.phoneNumber,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      Address: formData.Address,
      describeProblem: formData.describeProblem,
    };

    console.log("Updating appointment:", updatedAppointment);

    try {
      const response = await fetch(
        `http://localhost:5001/api/appointments/${editingAppointment.appointmentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAppointment),
        }
      );

      if (response.ok) {
        const updatedAppointments = appointments.map((appt) =>
          appt.appointmentId === editingAppointment.appointmentId
            ? { ...updatedAppointment, appointmentId: appt.appointmentId }
            : appt
        );

        setAppointments(updatedAppointments);
        setEditingAppointment(null);
        alert("Appointment updated successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to update appointment:", errorData);
        alert(`Failed to update appointment: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
    <div className="nav">
        <div className="logo"></div>
        <div className="navbtn">
          <button onClick={() => navigate('/dashboard')} className="bt nav-link">Home</button>
          <button onClick={() => navigate('/contact')} className="bt nav-link">Contact</button>
          <button onClick={() => navigate('/aboutus')} className="bt nav-link">About us</button>
        </div>
      </div>
      <div className="container">
        <h1>My Appointments</h1>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul className="appointment-list">
            {appointments.map((appointment) => (
              <li key={appointment.appointmentId} className="appointment-item">
                <p><strong>Phone:</strong> {appointment.phoneNumber}</p>
                <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                <p><strong>Address:</strong> {appointment.Address}</p>
                <p><strong>Problem:</strong> {appointment.describeProblem}</p>
                <div className="buttons">
                  <button className="btn btn-edit" onClick={() => handleEdit(appointment)}>Edit</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(appointment.appointmentId)}>Cancel</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editingAppointment && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Appointment</h2>
            <label>Phone:</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            <label>Date:</label>
            <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} />
            <label>Time:</label>
            <input type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} />
            <label>Address:</label>
            <input type="text" name="Address" value={formData.Address} onChange={handleChange} />
            <label>Problem:</label>
            <textarea name="describeProblem" value={formData.describeProblem} onChange={handleChange}></textarea>
            <div className="buttons">
              <button className="btn btn-save" onClick={handleSave}>Save</button>
              <button className="btn btn-cancel" onClick={() => setEditingAppointment(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentList;
