import { useState } from "react";
import "../style/LoginSignupModal.css";

const HandyPros = () => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleRedirect = (path) => {
    closeModal();
    window.location.href = path;
  };

  return (
    <div className="h-screen flex flex-col bg-cover bg-center bg-gray-900 text-white"
         style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/api/placeholder/1920/1080')" }}>
      
      {/* Header */}
      <header className="p-5 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl font-bold">
            H
          </div>
          <h1 className="text-2xl font-semibold ml-3">HandyPros</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center flex-grow px-4">
        <h2 className="text-4xl font-bold mb-6">Professional Home Services</h2>

        {/* Service Icons */}
        <div className="flex space-x-10 mb-6">
          <div className="text-center">
            <div className="text-4xl text-yellow-500">🛠️</div>
            <h3 className="mt-2 text-lg">Carpentry</h3>
          </div>
          <div className="text-center">
            <div className="text-4xl text-yellow-500">🚰</div>
            <h3 className="mt-2 text-lg">Plumbing</h3>
          </div>
          <div className="text-center">
            <div className="text-4xl text-yellow-500">⚡</div>
            <h3 className="mt-2 text-lg">Electrical</h3>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button onClick={() => openModal("login")} className="bg-orange-500 px-6 py-3 rounded text-lg font-semibold hover:bg-orange-600">
            Login
          </button>
          <button onClick={() => openModal("signup")} className="bg-orange-500 px-6 py-3 rounded text-lg font-semibold hover:bg-orange-600">
            Sign Up
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center bg-black/80">
        <p>© 2025 HandyPros - Your Local Service Experts</p>
      </footer>

      {/* Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg w-80 text-center">
            <h3 className="text-2xl font-bold mb-4">{modalType === "login" ? "Login As" : "Sign Up As"}</h3>
            <div className="space-y-3">
              <button onClick={() => handleRedirect(`/${modalType}/user`)} className="block w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                {modalType === "login" ? "User Login" : "User Sign Up"}
              </button>
              <button onClick={() => handleRedirect(`/${modalType}/provider`)} className="block w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                {modalType === "login" ? "Service Provider Login" : "Service Provider Sign Up"}
              </button>
            </div>
            <button onClick={closeModal} className="mt-4 text-gray-500 hover:text-black">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandyPros;
