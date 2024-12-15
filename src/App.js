import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Track from "./components/Track";
import Goal from "./components/Goal";

function App() {
  return (
    <Router>
      {/* Navbar is outside Routes so it's always visible */}
      <Navbar />
      
      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/track" element={<Track />} />
        <Route path="/goal" element={<Goal />} />
      </Routes>
    </Router>
  );
}

export default App;
