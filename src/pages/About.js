// src/pages/About.js
import React from "react";
import "./CodeScan.css"; // reuse same styles as other pages

function About() {
  return (
    <div className="scan-page">
      <div className="scan-card">
        {/* HEADER */}
        <div className="scan-header">
          <div className="scan-icon">🛡️</div>
          <div className="scan-title">About DevSecur360</div>
        </div>

        {/* SHORT INTRO */}
        <p className="about-tagline">
          DevSecur360 is a mini DevSecOps dashboard that helps developers
          quickly check security issues in <strong>source code</strong> and{" "}
          <strong>web applications</strong> during development.
        </p>

        <div className="about-pill-row">
          <span className="about-pill">Source Code Scan</span>
          <span className="about-pill">External Web Scan</span>
          <span className="about-pill">Scan History</span>
          <span className="about-pill">AI-style Summary</span>
        </div>

        {/* FEATURE CARDS */}
        <div className="about-section">
          <h2 className="about-section-title">Features</h2>

          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-icon">💻</div>
              <h3>Source Code Scan</h3>
              <p>
                Upload a code file, view dummy findings with severity chips and a
                score just like real SAST tools.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card-icon">🌐</div>
              <h3>External Web Scan</h3>
              <p>
                Enter a URL to simulate checks for CSP, HSTS and X-Frame-Options
                headers and see a security score.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card-icon">📊</div>
              <h3>History</h3>
              <p>
                Each scan is stored with type, date, score and status so you can
                track improvements over time.
              </p>
            </div>
          </div>
        </div>

        {/* TECH STACK */}
        <div className="about-section">
          <h2 className="about-section-title">Tech Stack</h2>
          <p className="about-text">
            Built as a full-stack JS project:
          </p>

          <div className="about-chip-row">
            <span className="about-chip">React</span>
            <span className="about-chip">React Router</span>
            <span className="about-chip">Node.js</span>
            <span className="about-chip">Express</span>
            <span className="about-chip">PostgreSQL</span>
            <span className="about-chip">Axios</span>
            <span className="about-chip">Multer</span>
          </div>

          <p className="about-text about-small">
            In demo mode the scanners return realistic sample issues, so you can
            focus on the UI and workflow exactly like in the video.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
