import React, { useState } from "react";
import '../style/ServiceFinder.css';

const ServiceFinder = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isProviderInfoVisible, setIsProviderInfoVisible] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");

  const serviceData = {
    Plumbing: {
      providers: [
        { name: "John's Plumbing", phone: "123-456-7890", rating: 4.5 },
        { name: "QuickFix Plumbing", phone: "987-654-3210", rating: 4.2 },
      ],
    },
    Carpentry: {
      providers: [
        { name: "WoodCraft Carpentry", phone: "555-123-9876", rating: 4.8 },
        { name: "HammerTime Carpentry", phone: "555-234-8765", rating: 4.6 },
      ],
    },
    Electrical: {
      providers: [
        { name: "BrightSpark Electricians", phone: "555-123-4567", rating: 4.9 },
        { name: "PowerGrid Electrical", phone: "555-987-6543", rating: 4.7 },
      ],
    },
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    if (username === "admin" && password === "admin123") {
      alert("Login successful!");
      setIsLoginModalOpen(false);
    } else {
      alert("Invalid credentials, please try again.");
    }
  };

  const showProviders = (service) => {
    setSelectedService(service);
    setIsProviderInfoVisible(true);
  };

  const openContactForm = (providerName) => {
    setSelectedProvider(providerName);
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">PROFIX</div>
          <nav className="hidden md:flex space-x-4">
            <a href="#home" className="text-gray-600 hover:text-blue-600">
              Home
            </a>
            <a href="#services" className="text-gray-600 hover:text-blue-600">
              Services
            </a>
            <a href="#about us" className="text-gray-600 hover:text-blue-600">
              About Us
            </a>
            <a href="#contact us" className="text-gray-600 hover:text-blue-600">
              Contact Us
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <form className="relative">
              <input
                type="text"
                placeholder="Search services..."
                className="pl-8 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </form>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Trusted Service Providers Near You
            </h1>
            <p className="text-xl mb-8">
              Get help from experienced professionals in your area
            </p>
            <form className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search for a service or provider..."
                className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition duration-300"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.keys(serviceData).map((service) => (
                <div
                  key={service}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition duration-300 hover:shadow-lg"
                >
                  <i className="fas fa-wrench text-blue-600 text-4xl mb-4"></i>
                  <h3 className="text-xl font-semibold">{service}</h3>
                  <button
                    className="mt-4 text-blue-600"
                    onClick={() => showProviders(service)}
                  >
                    View Providers
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">
                  "The service was fantastic! They were quick and efficient.
                  Highly recommend!"
                </p>
                <p className="font-semibold">John Doe</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">
                  "I am very happy with the electrician service. They did an
                  excellent job."
                </p>
                <p className="font-semibold">Jane Smith</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">
                  "Affordable, reliable, and professional. Will use their
                  services again."
                </p>
                <p className="font-semibold">Mark Wilson</p>
              </div>
            </div>
          </div>
        </section>

        {/* Provider Info Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Contact a Service Provider</h2>
            {isProviderInfoVisible && (
              <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">
                  {selectedService} Providers
                </h3>
                <div>
                  {serviceData[selectedService].providers.map((provider) => (
                    <div key={provider.name} className="mb-4">
                      <h4 className="text-xl font-semibold">{provider.name}</h4>
                      <p className="text-gray-600">Phone: {provider.phone}</p>
                      <p className="text-yellow-500">
                        Rating: {"★".repeat(Math.round(provider.rating))}
                      </p>
                      <button
                        className="text-blue-600 mt-2"
                        onClick={() => openContactForm(provider.name)}
                      >
                        Contact this provider
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">PROFIX</h3>
              <p className="text-gray-400">
                Find trusted service providers near you
              </p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2023 PROFIX. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                className="text-blue-600"
                onClick={() => setIsLoginModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {isContactFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-2xl font-semibold mb-4">
              Contact {selectedProvider}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Please wait, we'll contact you soon!");
                closeContactForm();
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="w-full p-2 mb-4 border rounded"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-full w-full"
              >
                Send Message
              </button>
            </form>
            <button
              className="mt-4 text-red-600"
              onClick={closeContactForm}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceFinder;