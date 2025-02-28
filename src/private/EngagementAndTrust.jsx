import React, { useState } from 'react';

const EngagementAndTrust = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        alert("Login successful!");
        setIsModalOpen(false);
    };

    return (
        <section className="py-16 bg-blue-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">Contact a Service Provider</h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold">
                    Login to Contact
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md w-96">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <input type="text" placeholder="Username" className="w-full p-2 border rounded" required />
                            <input type="password" placeholder="Password" className="w-full p-2 border rounded" required />
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Login</button>
                        </form>
                        <div className="mt-4 text-center">
                            <button onClick={() => setIsModalOpen(false)} className="text-blue-600">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default EngagementAndTrust;


// import React, { useState } from "react";
// import './EngagementAndTrust.css';

// const EngagementAndTrust = () => {
//   return (
//     <section className="engagement-and-trust py-16 bg-gray-100">
//       <div className="container mx-auto px-4 text-center">
//         <h2 className="text-3xl font-bold mb-6 text-blue-600">Engagement and Trust</h2>
//         <p className="text-lg text-gray-600 mb-8">
//           Foster meaningful connections and ensure trust with features designed for user engagement.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow-md engagement-card">
//             <i className="fas fa-comments text-blue-500 text-4xl mb-4"></i>
//             <h3 className="text-xl font-semibold">Community Engagement</h3>
//             <p className="text-gray-600">Build a vibrant community through active participation and feedback.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md engagement-card">
//             <i className="fas fa-thumbs-up text-green-500 text-4xl mb-4"></i>
//             <h3 className="text-xl font-semibold">User Reviews & Ratings</h3>
//             <p className="text-gray-600">Enhance credibility by allowing users to share their experiences.</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md engagement-card">
//             <i className="fas fa-shield-alt text-yellow-500 text-4xl mb-4"></i>
//             <h3 className="text-xl font-semibold">Trust & Security</h3>
//             <p className="text-gray-600">Ensure a safe and secure platform with robust trust-building measures.</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EngagementAndTrust;
