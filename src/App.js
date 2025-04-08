import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import MainContent from "./components/Main/MainContent";
import DetailPage from "./components/Main/DetailPage";
import Login from "./components/Admin/Login";
import Dashboard from "./components/Admin/Dashboard";
import Category_Articles from "./components/Main/CategoryBrowser";
import "./styles.css";

function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '781279445244-3imq1spqc7hqovf8lm30uj2mi94jf2lp.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <Routes>
          {/* Layout người dùng */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <MainContent />
                <Footer />
              </>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <>
                <Header />
                <DetailPage />
                <Footer />
              </>
            }
          />
           <Route
            path="/category/:categoryId"
            element={
              <>
                {" "}
                <Header /> <Category_Articles /> <Footer />
              </>
            }
          />

          {/* Layout trang admin, KHÔNG có header/footer */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
