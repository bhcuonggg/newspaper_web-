import React from "react";
import Header from "../components/header";

const HomeScreen = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px" }}>
        <h2>Welcome to the News Website</h2>
        <p>Stay updated with the latest news.</p>
      </main>
    </div>
  );
};

export default HomeScreen;
