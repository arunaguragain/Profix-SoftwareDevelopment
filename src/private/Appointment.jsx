import React, { useState } from "react";
import "./Appointment.css";

const Appointment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    date: "",
    time: "",
    address: "",
    problem: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Details:", formData);
    alert("Appointment successfully submitted!");
    setFormData({ phone: "", date: "", time: "", address: "", problem: "" });
    setIsOpen(false);
  };

  return (
    <div className="container">
      <button onClick={() => setIsOpen(true)} className="open-popup-btn">
        Book Appointment
      </button>

      {isOpen && (
        <div className="popup active">
          <form onSubmit={handleSubmit}>
            <h1>Book Appointment</h1>

            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., (100) 000-0000"
              required
            />

            <label htmlFor="date">Preferred Appointment Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label htmlFor="time">Preferred Appointment Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label htmlFor="problem">Describe Your Problem:</label>
            <textarea
              id="problem"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              required
            />

            <div className="buttons">
              <button type="submit" className="btn">Submit</button>
              <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Appointment;
