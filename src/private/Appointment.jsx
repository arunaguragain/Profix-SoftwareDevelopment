import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Appointment.css";

const Appointment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    appointmentDate: "",
    appointmentTime: "",
    Address: "",  
    describeProblem: "",
  });

  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const formattedFormData = {
      ...formData,
    };

    console.log("Formatted Form Data:", formattedFormData);

    try {
      const response = await fetch("http://localhost:5001/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedFormData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Appointment successfully submitted!");
        setFormData({
          phoneNumber: "",
          appointmentDate: "",
          appointmentTime: "",
          Address: "",
          describeProblem: "",
        });
        setIsOpen(false);
        navigate("/myappointment");
        window.location.reload();  // Redirect after success
      } else {
        alert(`Error: ${data.error || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("❌ Error submitting appointment:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      {/* <button onClick={() => setIsOpen(true)} className="open-popup-btn">
        Book Appointment
      </button>

      {isOpen && ( */}
        <div className="popup active">
          <form onSubmit={handleSubmit}>
            <h1>Book Appointment</h1>

            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"  // Changed to 'text' to allow number input as string
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g., 987652544"
              required
            />

            <label htmlFor="appointmentDate">Preferred Appointment Date:</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />

            <label htmlFor="appointmentTime">Preferred Appointment Time:</label>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
            />

            <label htmlFor="Address">Address:</label>
            <input
              type="text"
              id="Address"
              name="Address"
              value={formData.address}
              onChange={handleChange}
            />

            <label htmlFor="describeProblem">Describe Your Problem:</label>
            <textarea
              id="describeProblem"
              name="describeProblem"
              value={formData.describeProblem}
              onChange={handleChange}
              required
            />

            <div className="buttons">
              <button type="submit" className="btn">Submit</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      {/* )} */}
    </div>
  );
};

export default Appointment;

