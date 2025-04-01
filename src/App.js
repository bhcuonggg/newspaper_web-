import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from "./components/Header/header";
import MainContent from "./components/Main/MainContent";
import Footer from "./components/Footer/footer";
import "./styles.css";
import Login from "./components/Admin/Login";
import Dashboard from "./components/Admin/Dashboard";

function App() {
  // Thay thế bằng Google Client ID thực tế của bạn
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '781279445244-3imq1spqc7hqovf8lm30uj2mi94jf2lp.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;