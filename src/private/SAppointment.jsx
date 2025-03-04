import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/MyAppointment.css";

const SAppointmentList = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from the backend
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

  return (
    <>
      <div className="nav">
        <div className="logo"></div>
        <div className="navbtn">
          <button onClick={() => navigate('/serviceproviderprofile')} className="bt nav-link">Home</button>
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SAppointmentList;
