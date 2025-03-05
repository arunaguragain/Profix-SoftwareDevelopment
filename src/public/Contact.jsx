import { useState } from "react";
import "../style/Contact.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    // Optionally, send data to a server
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-methods">
        <h3>Contact Methods</h3>
        <div className="contact-method">📞 Phone: <a href="tel:9814183767">+9779814183767</a></div>
        <div className="contact-method">📧 Email: <a href="mailto:support@profix.com">support@profix.com</a></div>
      </div>

      <div className="contact-form">
        <h3>Send Us a Message</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Your Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;