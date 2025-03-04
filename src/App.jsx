import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {
  const UserRegistration = React.lazy(() => import("./public/UserRegistration.jsx"));
  const PasswordRecovery = React.lazy(() => import("./private/PasswordRecovery.jsx"));
  const Favorites = React.lazy(() => import("./private/Favorites.jsx"));
  const ReviewsAndRatings = React.lazy(() => import("./private/ReviewsAndRatings.jsx"));
  const EmergencyServices = React.lazy(() => import("./private/EmergencyContact.jsx"));
  const UserProfile = React.lazy(() => import("./private/UserProfile.jsx"));
  const ProFixAdminDashboard = React.lazy(() => import("./private/UserModeration.jsx"));
  const MyAppointment = React.lazy(() => import("./private/MyAppointment.jsx"))

  const ServiceProviderRegistration = React.lazy(() => import("./public/ServiceProviderRegistration.jsx"));
  const ServiceProviderProfile = React.lazy(() => import("./private/SeviceProviderProfile.jsx"));
  const AboutUs = React.lazy(() => import("./public/AboutUs.jsx"));
  const Appointment = React.lazy(() => import("./private/Appointment.jsx"));
  const Dashboard = React.lazy(() => import("./private/Dashboard.jsx"));
  const DeletePopUp = React.lazy(() => import("./private/DeletePopUp.jsx"));
  const MainPageS = React.lazy(() => import("./public/MainPageS.jsx"));
  const LoginSignupModal = React.lazy (() => import ("./public/LoginSignupModal.jsx"));

  const ServiceProviderLogin = React.lazy(() => import("./public/ServiceProviderLogin.jsx"));
  const UserLogin = React.lazy(() => import("./public/UserLogin.jsx"));
  const Contact = React.lazy(() => import("./public/Contact.jsx"));
  const CommunityBuilding = React.lazy(() => import("./private/CommunityBuilding.jsx"));
  const RealTimeSupport = React.lazy(() => import("./private/RealTimeSupport.jsx"));
  const TranparencyAndTrust = React.lazy(() => import("./private/TranparencyAndTrust.jsx")); 
  const Notification = React.lazy(() => import("./private/Notification.jsx"));
  const ProfilesAndListings = React.lazy(() => import("./private/ProfilesAndListings.jsx"));
  const SearchAndDiscovery = React.lazy(() => import("./private/SearchAndDiscovery.jsx"));
  const PromoDiscount = React.lazy(() => import ("./private/PromoDiscount.jsx"));


  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/MainPageS" />} />
          <Route path="/userregistration" element={<UserRegistration />} />
          <Route path="/passwordrecovery" element={<PasswordRecovery />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/myappointment" element={<MyAppointment />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deletepopup" element={<DeletePopUp />} />
          <Route path="/mainpages" element={<MainPageS />} />
          <Route path="/serviceproviderlogin" element={<ServiceProviderLogin />} />
          <Route path="/serviceproviderregistration" element={<ServiceProviderRegistration />} />
          <Route path="/serviceproviderprofile" element={<ServiceProviderProfile />} />
          <Route path= "/loginsignupmodal" element= {<LoginSignupModal/>}></Route>
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/communitybuilding" element={<CommunityBuilding />} />
          <Route path="/realtimesupport" element={<RealTimeSupport />} />
          <Route path="/reviewsandratings" element={<ReviewsAndRatings />} />
          <Route path="/emergencyservices" element={<EmergencyServices />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/profixadmindashboard" element={<ProFixAdminDashboard />} />
          <Route path="/transparencyandtrust" element={<TranparencyAndTrust />} />
          <Route path="/searchanddiscovery" element={<SearchAndDiscovery />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/profilesandlistings" element={<ProfilesAndListings />} />
          <Route path = "/promodiscount" element ={<PromoDiscount/>}></Route>
        </Routes>
        </Suspense>
        </Router>
  );
}

export default App;