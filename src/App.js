import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import "bootstrap/dist/css/bootstrap.min.css";
import ContactUs from "./components/Contact";

function App() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Home Section (Hero, Features, Reviews) */}
      <Home />
      <AboutUs />
      <ContactUs />
      
      {/* Optional Footer */}
      <footer className="text-center py-4 bg-light">
        <p>&copy; 2024 MoneyPlant. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
