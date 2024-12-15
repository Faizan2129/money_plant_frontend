import React from "react";
import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUsCard from "./AboutUs";
import ContactUs from "./Contact";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <header className="hero-section text-center text-white py-5">
        <div className="container">
          <h1 className="display-4">Welcome to MoneyPlant</h1>
          <p className="lead">
            Take control of your finances and grow your wealth effortlessly.
          </p>
          <a href="./login" className="btn btn-primary btn-lg mt-3">
            Get Started
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Features</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card text-center">
                <i className="bi bi-wallet2"></i>
                <h4>Expense Tracking</h4>
                <p>Monitor your spending and categorize expenses effortlessly.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card text-center">
                <i className="bi bi-bar-chart-line"></i>
                <h4>Savings Goals</h4>
                <p>Set and track your savings goals to achieve financial stability.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card text-center">
                <i className="bi bi-bell"></i>
                <h4>Overspending Alerts</h4>
                <p>Get notified when you're close to exceeding your budget.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Reviews Section */}
      <section id="reviews" className="reviews-section bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">What Users Are Saying</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card p-3">
                <blockquote className="blockquote mb-0">
                  <p>
                    "MoneyPlant completely transformed the way I manage my
                    finances. Highly recommend!"
                  </p>
                  <footer className="blockquote-footer">
                    Jane Doe, <cite title="Source Title">New York</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3">
                <blockquote className="blockquote mb-0">
                  <p>
                    "The savings goal feature helped me save for my dream
                    vacation!"
                  </p>
                  <footer className="blockquote-footer">
                    John Smith, <cite title="Source Title">California</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3">
                <blockquote className="blockquote mb-0">
                  <p>
                    "I love the overspending alerts. They keep me on track with
                    my budget."
                  </p>
                  <footer className="blockquote-footer">
                    Emily Rose, <cite title="Source Title">London</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <AboutUsCard />
      </section>
      <section>
        <ContactUs />
      </section>
    </div>
    
  );
}

export default Home;
