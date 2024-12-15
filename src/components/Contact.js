import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await axios.post("http://localhost:7002/contact", formData);
      console.log("Message sent successfully:", response.data);
      setFeedback({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (err) {
      console.error("Error sending message:", err.response ? err.response.data : err.message);
      setFeedback({ type: "error", message: "Failed to send message. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-us" className="contact-us-section py-5">
      <div className="container">
        <h2 className="text-center mb-4">Contact Us</h2>

        <div className="row">
          {/* Contact Form */}
          <div className="col-md-6 mx-auto">
            <div className="card mb-4">
              <div className="card-body">
                {feedback.message && (
                  <div
                    className={`alert ${
                      feedback.type === "success" ? "alert-success" : "alert-danger"
                    }`}
                    role="alert"
                  >
                    {feedback.message}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Your Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Details (Address, Phone, Social Media) */}
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h4>Contact Information</h4>
                <ul className="list-unstyled">
                  <li>
                    <strong>Address:</strong> 123 MoneyPlant St., Financial City, FC 12345
                  </li>
                  <li>
                    <strong>Phone:</strong> +1 234 567 890
                  </li>
                  <li>
                    <strong>Email:</strong> contact@moneyplant.com
                  </li>
                </ul>
                <h5>Follow Us</h5>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-facebook fs-3"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-twitter fs-3"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-linkedin fs-3"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <i className="bi bi-instagram fs-3"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
