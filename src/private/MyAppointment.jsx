import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/MyAppointment.css";

const AppointmentList = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      phone: "123-456-7890",
      date: "2025-03-10",
      time: "10:00 AM",
      address: "123 Main St",
      problem: "Leaky faucet",
    },
    {
      id: 2,
      phone: "987-654-3210",
      date: "2025-03-12",
      time: "02:00 PM",
      address: "456 Elm St",
      problem: "Electrical issue",
    },
  ]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({ phone: "", date: "", time: "", address: "", problem: "" });

  // Handle delete appointment
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  // Handle edit appointment (open modal with selected appointment data)
  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setFormData(appointment);
  };

  // Handle input change in edit form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle save changes
  const handleSave = () => {
    setAppointments(
      appointments.map((appt) => (appt.id === editingAppointment.id ? { ...formData, id: appt.id } : appt))
    );
    setEditingAppointment(null);
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
              <li key={appointment.id} className="appointment-item">
                <p><strong>Phone:</strong> {appointment.phone}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Address:</strong> {appointment.address}</p>
                <p><strong>Problem:</strong> {appointment.problem}</p>
                <div className="buttons">
                  <button className="btn btn-edit" onClick={() => handleEdit(appointment)}>Edit</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(appointment.id)}>Cancel</button>
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
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
            <label>Time:</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} />
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
            <label>Problem:</label>
            <textarea name="problem" value={formData.problem} onChange={handleChange}></textarea>
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
