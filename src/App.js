import React from "react";
import Header from "./components/Header/header";
import MainContent from "./components/Main/MainContent";
import Footer from "./components/Footer/footer";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;