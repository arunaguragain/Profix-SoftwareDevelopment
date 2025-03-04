import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/FAQs.css';
import logo from '../pictures/logo.png';

const FAQs = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqData = [
    {
      question: "How does Profix work?",
      answer: "Profix connects you with qualified local service providers. Simply search for the service you need, browse through verified professionals, read reviews, and book appointments directly through our platform."
    },
    {
      question: "Are the service providers verified?",
      answer: "Yes, all service providers on Profix undergo a thorough verification process including background checks, license verification, and reference checks to ensure quality and safety."
    },
    {
      question: "How do I book a service?",
      answer: "To book a service, select a provider from our listings, click 'Book Appointment', choose your preferred date and time, and confirm your booking. You'll receive a confirmation email with all the details."
    },
    {
      question: "What services are available on Profix?",
      answer: "We offer a wide range of home services including plumbing, electrical work, carpentry, painting, appliance repair, and more. Each category has multiple verified professionals."
    },
    {
      question: "How are the service providers rated?",
      answer: "Service providers are rated based on customer reviews and feedback. Ratings are on a 5-star scale and include factors like punctuality, professionalism, and quality of work."
    },
    {
      question: "What happens if I'm not satisfied with the service?",
      answer: "If you're not satisfied with the service, please contact our customer support team immediately. We have a satisfaction guarantee and will work to resolve any issues promptly."
    },
    {
      question: "How do I pay for services?",
      answer: "Payment can be made securely through our platform using credit/debit cards or digital payment methods. Payment is only released to the service provider after you're satisfied with the work."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="main-container">
      <div className="nav">
        <div className="logo">
          <img src={logo} alt="Profix Logo" className="logo-img" />
        </div>
        <div className="navbtn">
          <button onClick={() => navigate('/dashboard')} className="bt nav-link">Home</button>
          <button onClick={() => navigate('/contact')} className="bt nav-link">Contact</button>
          <button onClick={() => navigate('/aboutus')} className="bt nav-link">About us</button>
        </div>
      </div>

      <div className="faq-page-container">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        
        <div className="faq-content-wrapper">
          {/* FAQs Column */}
          <div className="faq-column">
            <div className="faq-list">
              {faqData.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    {faq.question}
                    <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
                  </button>
                  <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div className="inquiry-column">
            <div className="inquiry-form-container">
              <h2 className="inquiry-title">Still have questions?</h2>
              <p className="inquiry-subtitle">Send us your inquiry</p>
              <form onSubmit={handleSubmit} className="inquiry-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;