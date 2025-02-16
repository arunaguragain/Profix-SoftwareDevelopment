import { useState, useEffect } from 'react';
import '../style/Notification.css';

export default function Notification() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const showNotification = (message) => {
      setNotification(message);
      setTimeout(() => setNotification(null), 3000);
    };

    // Example usage:
    // showNotification("Service request sent successfully!");
  }, []);

  if (!notification) return null;

  return (
    <div className="notification">
      {notification}
    </div>
  );
}


// import React, { useState, useEffect } from 'react';
// import '../style/Notification.css';

// const Notification = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);

//   useEffect(() => {
//     // Simulated notifications data
//     const demoNotifications = [
//       {
//         id: 1,
//         type: 'request',
//         message: 'New service request from John Doe',
//         time: '5 minutes ago'
//       },
//       {
//         id: 2,
//         type: 'update',
//         message: 'Your request has been accepted by PlumbPro Services',
//         time: '1 hour ago'
//       },
//       {
//         id: 3,
//         type: 'reminder',
//         message: 'Upcoming appointment tomorrow at 10 AM',
//         time: '2 hours ago'
//       }
//     ];

//     setNotifications(demoNotifications);
//   }, []);

//   const handleNotificationClick = (id) => {
//     // Handle notification click
//     console.log('Notification clicked:', id);
//   };

//   return (
//     <div className="notification-container">
//       <button
//         className="notification-bell"
//         onClick={() => setShowNotifications(!showNotifications)}
//       >
//         <span className="notification-count">{notifications.length}</span>
//       </button>

//       {showNotifications && (
//         <div className="notifications-panel">
//           <div className="notifications-header">
//             <h3>Notifications</h3>
//             <button onClick={() => setShowNotifications(false)}>Close</button>
//           </div>
//           <div className="notifications-list">
//             {notifications.map((notification) => (
//               <div
//                 key={notification.id}
//                 className={`notification-item ${notification.type}`}
//                 onClick={() => handleNotificationClick(notification.id)}
//               >
//                 <p className="notification-message">{notification.message}</p>
//                 <span className="notification-time">{notification.time}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notification;