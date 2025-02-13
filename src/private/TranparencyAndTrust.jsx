import React from 'react';
import '../style/TranparencyAndTrust.css';

const TransparencyAndTrust = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "Homeowner",
      content: "The service was fantastic! They were quick and efficient. Highly recommend!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Business Owner",
      content: "I am very happy with the electrician service. They did an excellent job.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      name: "Mark Wilson",
      role: "Property Manager",
      content: "Affordable, reliable, and professional. Will use their services again.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="transparency-trust py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trusted by Thousands of Customers
        </h2>

        <div className="trust-features mb-16">
          <div className="feature">
            <div className="feature-icon">✓</div>
            <h3>Verified Providers</h3>
            <p>All service providers are thoroughly vetted and verified</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⭐</div>
            <h3>Customer Reviews</h3>
            <p>Real reviews from real customers</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🛡️</div>
            <h3>Secure Payments</h3>
            <p>Your payments are always protected</p>
          </div>
        </div>

        <div className="testimonials">
          <h3 className="text-2xl font-bold text-center mb-8">
            What Our Customers Say
          </h3>
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <p>{testimonial.content}</p>
                </div>
                <div className="testimonial-author">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="author-image"
                  />
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencyAndTrust;