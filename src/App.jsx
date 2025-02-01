import React, { Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  const MainPage = React.lazy(() => import("./public/MainPage.jsx"));
  const UserRegistration = React.lazy(() => import("./public/UserRegistration.jsx"));
  const PasswordRecovery = React.lazy(() => import("./private/PasswordRecovery.jsx"));
  const Favorites = React.lazy(() => import("./private/Favorites.jsx"));
  const AboutUs = React.lazy(() => import("./public/AboutUs.jsx"))
  const Appointment = React.lazy(() => import("./private/Appointment.jsx"))

  return (
    <Router>
      <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to ="/MainPage"/>}></Route>
        <Route path="/userregistration" element={<UserRegistration/>}></Route>
        <Route path="/passwordrecovery" element={<PasswordRecovery/>}></Route>
        <Route path="/favorites" element={<Favorites/>}></Route>
        <Route path = "/aboutus" element={<AboutUs/>}></Route>
        <Route path = "/appointment" element ={<Appointment/>}></Route>
        <Route path = "/dashboard" element ={<Appointment/>}></Route>
        
      </Routes>
      </Suspense>
    </Router>

  );
   
}

export default App
