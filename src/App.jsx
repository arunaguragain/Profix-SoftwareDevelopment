import React, { Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const MainPage = React.lazy(() => import("./public/MainPage.jsx"));

  return (
    <Router>
      <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to ="/MainPage"/>}></Route>
      </Routes>
      </Suspense>
    </Router>

  );
   
}

export default App
