import React, { useState } from "react";
import "../style/MainPageS.css";

const MainPage = () => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleRedirect = (path) => {
    closeModal();
    window.location.href = path;
  };

  return (
    <div className="container">
      <header>
        <div className="logo">
          <span className="logo-icon">🛠️</span>
          <h1>ProFix</h1>
        </div>
      </header>

      <main>
        <div className="hero-content">
          <h2>Professional Home Services</h2>
          <div className="services">
            <div className="service">
              <span className="service-icon">🔨</span>
              <h3>Carpentry</h3>
            </div>
            <div className="service">
              <span className="service-icon">🚰</span>
              <h3>Plumbing</h3>
            </div>
            <div className="service">
              <span className="service-icon">💡</span>
              <h3>Electrical</h3>
            </div>
          </div>
        </div>

        <div className="buttons">
          <button className="btn btn-login" onClick={() => openModal("login")}>Login</button>
          <button className="btn btn-signup" onClick={() => openModal("signup")}>Sign Up</button>
        </div>
      </main>

      <footer>
        <p>© 2025 ProFix - Your Local Service Experts</p>
      </footer>

      {modalType && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{modalType === "login" ? "Login As" : "Sign Up As"}</h2>
            {modalType === "login" ? (
              <>
                <button className="modal-btn" onClick={() => handleRedirect(" ")}>User Login</button>
                <button className="modal-btn" onClick={() => handleRedirect(" ")}>Service Provider Login</button>
              </>
            ) : (
              <>
                <button className="modal-btn" onClick={() => handleRedirect("/userregistration")}>User Sign Up</button>
                <button className="modal-btn" onClick={() => handleRedirect("/serviceproviderregistration")}>Service Provider Sign Up</button>
              </>
            )}
            <button className="modal-close" onClick={closeModal}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
