import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/FAQs.css';
import logo from '../pictures/logo.png';
// import api from '../services/api';

const FAQs = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [submittedInquiries, setSubmittedInquiries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Initialize submittedInquiries from local storage on component mount
  useEffect(() => {
    const storedInquiries = localStorage.getItem('submittedInquiries');
    if (storedInquiries) {
      setSubmittedInquiries(JSON.parse(storedInquiries));
    }
  }, []);

  // Save submittedInquiries to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('submittedInquiries', JSON.stringify(submittedInquiries));
  }, [submittedInquiries]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      const newInquiry = {
        ...formData,
        id: Date.now(),
        timestamp: new Date().toLocaleString()
      };

      // Add new inquiry to the list
      setSubmittedInquiries(prev => [...prev, newInquiry]);

      setSubmittedData(formData);
      setShowConfirmation(true);
      
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      alert('Failed to submit inquiry. Please try again later.');
    }
  };

  const handleEdit = (inquiry) => {
    setEditingId(inquiry.id);
    setEditFormData({
      name: inquiry.name,
      email: inquiry.email,
      subject: inquiry.subject,
      message: inquiry.message
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        // Filter out the inquiry to be deleted
        const updatedInquiries = submittedInquiries.filter(inquiry => inquiry.id !== id);
        setSubmittedInquiries(updatedInquiries);
      } catch (error) {
        alert('Failed to delete inquiry');
      }
    }
  };

  const handleEditSubmit = async (id) => {
    try {
      // Update the inquiry in the list
      const updatedInquiries = submittedInquiries.map(inquiry => 
        inquiry.id === id ? { ...inquiry, ...editFormData } : inquiry
      );
      setSubmittedInquiries(updatedInquiries);
      setEditingId(null);
    } catch (error) {
      alert('Failed to update inquiry');
    }

  
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
                    placeholder="Subject (e.g., Service Question, Technical Issue, Booking Help)"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Please describe your question or concern in detail. Include relevant information such as service type, location, or specific requirements."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
            {submittedInquiries.length > 0 && (
              <div className="submitted-inquiries">
                <h3 className="submitted-title">Your Recent Inquiries</h3>
                <div className="inquiry-cards">
                  {submittedInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="inquiry-result-card">
                      {editingId === inquiry.id ? (
                        // Edit Form
                        <div className="edit-form">
                          <div className="edit-form-header">
                            <h4>Edit Inquiry</h4>
                            <button 
                              className="close-btn"
                              onClick={() => setEditingId(null)}
                            >×</button>
                          </div>
                          <div className="edit-form-content">
                            <div className="form-group">
                              <input
                                type="text"
                                value={editFormData.name}
                                onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                                placeholder="Your Name"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="email"
                                value={editFormData.email}
                                onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                                placeholder="Your Email"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                value={editFormData.subject}
                                onChange={(e) => setEditFormData({...editFormData, subject: e.target.value})}
                                placeholder="Subject"
                              />
                            </div>
                            <div className="form-group">
                              <textarea
                                value={editFormData.message}
                                onChange={(e) => setEditFormData({...editFormData, message: e.target.value})}
                                placeholder="Message"
                                rows="3"
                              />
                            </div>
                            <div className="edit-form-actions">
                              <button 
                                className="save-btn"
                                onClick={() => handleEditSubmit(inquiry.id)}
                              >
                                Save Changes
                              </button>
                              <button 
                                className="cancel-btn"
                                onClick={() => setEditingId(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Display Card
                        <>
                          <div className="inquiry-result-header">
                            <h4>{inquiry.subject}</h4>
                            <span className="inquiry-timestamp">{inquiry.timestamp}</span>
                          </div>
                          <div className="inquiry-result-body">
                            <p><strong>From:</strong> {inquiry.name}</p>
                            <p><strong>Email:</strong> {inquiry.email}</p>
                            <div className="inquiry-message">
                              <strong>Message:</strong>
                              <p>{inquiry.message}</p>
                            </div>
                          </div>
                          <div className="inquiry-card-actions">
                            <div className="inquiry-status">
                              <span className="status-badge">Pending Response</span>
                            </div>
                            <div className="action-buttons">
                              <button
                                className="edit-btn"
                                onClick={() => handleEdit(inquiry)}
                              >
                                Edit
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() => handleDelete(inquiry.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-card">
            <div className="confirmation-header">
              <h3>Inquiry Submitted Successfully!</h3>
              <button 
                className="close-btn"
                onClick={() => setShowConfirmation(false)}
              >
                ×
              </button>
            </div>
            <div className="confirmation-content">
              <p><strong>Name:</strong> {submittedData.name}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>Subject:</strong> {submittedData.subject}</p>
              <p><strong>Message:</strong></p>
              <p className="message-content">{submittedData.message}</p>
            </div>
            <div className="confirmation-footer">
              <p>We'll get back to you shortly!</p>
              <button 
                className="done-btn"
                onClick={() => setShowConfirmation(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQs;