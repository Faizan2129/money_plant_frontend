import React from "react";
import "./AboutUs.css";
// import "bootstrap/dist/css/bootstrap.min.css";

function AboutUsCard() {
  return (
    <section id="about-us" className="about-us-card-section py-5">
      <div className="container">
        <h2 className="text-center mb-4">About Us</h2>

        {/* Card for About Us */}
        <div className="card shadow-lg border-light">
          <div className="card-body">
            <h3 className="card-title text-center">Our Mission</h3>
            <p className="card-text">
              At MoneyPlant, our mission is to empower individuals to take control of their finances and
              achieve financial freedom. We provide easy-to-use tools that help people manage their money, track
              spending, and plan for a secure future.
            </p>

            <h4 className="text-center mt-4">Our Values</h4>
            <ul>
              <li>Integrity: We believe in being honest and transparent in everything we do.</li>
              <li>Innovation: We continuously improve and innovate to provide the best solutions for our users.</li>
              <li>Customer-Centric: Our users’ needs and satisfaction are at the heart of our business.</li>
              <li>Education: We strive to educate our users and help them make informed financial decisions.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsCard;
