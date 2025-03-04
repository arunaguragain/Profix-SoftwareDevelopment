import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/MyAppointment.css";

const SAppointmentList = () => {
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
  const [formData, setFormData] = useState({ phone: "", date: "", time: "", address: "", problem: "" });

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
              </li>
            ))}
          </ul>
        )}
      </div>

    </>
  );
};

export default SAppointmentList;
