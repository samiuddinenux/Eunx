import React, { useState } from "react";
import Countdown from "react-countdown";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import "./ComingSoonPage.css";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  dfsdfsd,
} from "@mui/material";
const ComingSoonPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission (can integrate with your backend here)
    alert(`Thanks for subscribing with: ${email}`);
    setEmail("");
  };

  // Countdown renderer
  const renderer = ({ days, hours, minutes, seconds }) => (
    <div className="countdown-timer">
      <div className="countdown-card">
        <span className="countdown-value">{days}</span>
        <span className="countdown-label">Days</span>
      </div>
      <div className="countdown-card">
        <span className="countdown-value">{hours}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <div className="countdown-card">
        <span className="countdown-value">{minutes}</span>
        <span className="countdown-label">Minutes</span>
      </div>
      <div className="countdown-card">
        <span className="countdown-value">{seconds}</span>
        <span className="countdown-label">Seconds</span>
      </div>
    </div>
  );

  return (
    <div className="coming-soon-container">
      <div className="left-section">
        <img src="/1.jpg" alt="Coming Soon" className="image" />
      </div>

      <div className="right-section">
        <div className="header">
          <h1 className="title">We’re Launching Soon!</h1>
          <p className="description">
            Stay tuned for something amazing coming your way.
          </p>
        </div>

        <Box className="countdown-section" mb={3}>
          <Countdown
            date={new Date("2025-06-01T00:00:00")}
            renderer={renderer}
          />
        </Box>

        <div className="email-signup">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Notify Me</button>
          </form>
        </div>
        <Box
          className="social-links"
          display="flex"
          justifyContent="center"
          gap={2}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={24} />
          </a>
        </Box>
      </div>
    </div>
  );
};

export default ComingSoonPage;
