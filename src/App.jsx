import React, { Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import './public/UserRegistration.css'
// import './private/PasswordRecovery.css'

function App() {
  const MainPage = React.lazy(() => import("./public/MainPage.jsx"));
  const UserRegistration = React.lazy(() => import("./public/UserRegistration.jsx"));
  const PasswordRecovery = React.lazy(() => import("./private/PasswordRecovery.jsx"))

  return (
    <Router>
      <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to ="/MainPage"/>}></Route>
        <Route path="/userregistration" element={<UserRegistration/>}></Route>
        <Route path="/passwordrecovery" element={<PasswordRecovery/>}></Route>
      </Routes>
      </Suspense>
    </Router>

  );
   
}

export default App
