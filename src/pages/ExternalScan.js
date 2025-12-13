import React, { useState } from "react";
import "./ExternalScan.css";  // <- MUST match filename EXACT (case-sensitive)
import axios from "axios";

function ExternalScan() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanError, setScanError] = useState("");
  const [result, setResult] = useState(null);
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentSummary, setAgentSummary] = useState("");

  const handleScan = async () => {
    setScanError("");
    setResult(null);
    setAgentSummary("");

    if (!url.trim()) {
      setScanError("Please enter a URL to scan.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/external-scan", {
        url: url.trim(),
      });
      // backend returns: { scanId, score, issues: [...] }
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setScanError("Scan failed. Please check backend and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRunAgent = () => {
    if (!result || !result.issues) return;
    setAgentRunning(true);

    const issues = result.issues;
    const high = issues.filter((i) => i.severity === "High").length;
    const medium = issues.filter((i) => i.severity === "Medium").length;
    const low = issues.filter((i) => i.severity === "Low").length;

    const summary = `
Overall external security score: ${result.score}.
High-risk findings: ${high}, medium: ${medium}, low: ${low}.
Fix first CSP / clickjacking issues (CSP + X-Frame-Options),
then enforce strict HTTPS (HSTS), and finally clean up
information-leak headers and remaining low-risk items.
    `.trim();

    setTimeout(() => {
      setAgentSummary(summary);
      setAgentRunning(false);
    }, 600);
  };

  return (
    <div className="code-scan-page">
      <div className="code-scan-card">
        {/* HEADER – SAME STYLE AS CODE SCAN */}
        <div className="code-scan-header">
          <span className="code-scan-icon">🌐</span>
          <h1>External Web Scan</h1>
        </div>

        {/* INPUT + BUTTON – SAME LAYOUT AS CODE SCAN */}
        <div className="code-scan-form">
          <div className="code-scan-dropzone">
            <input
              type="text"
              placeholder="https://your-website.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                color: "#f9fbff",
                outline: "none",
              }}
            />
          </div>

          <button
            className="btn-primary"
            onClick={handleScan}
            disabled={loading}
          >
            {loading ? "Scanning..." : "Run External Scan"}
          </button>

          <p className="code-scan-formats">
            Checks security headers (CSP, HSTS, X-Frame-Options), HTTPS posture,
            and information-leak headers (demo mode).
          </p>

          {scanError && <div className="code-scan-error">{scanError}</div>}
        </div>

        {/* RESULTS – SCORE + TABLE + AGENT (same UI pattern) */}
        {result && (
          <div className="scan-result">
            {/* Score badge */}
            <div className="scan-score-badge">
              <span>Score</span>
              <span>{result.score}</span>
            </div>

            {/* Table header */}
            <div className="scan-summary-header">
              <h2>Scan Summary</h2>
            </div>

            {/* Table */}
            <div className="scan-table-wrapper">
              <table className="scan-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Issue</th>
                    <th>Severity</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {result.issues.map((issue, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{issue.vulnerability}</td>
                      <td>
                        <span
                          className={`sev ${
                            issue.severity === "High"
                              ? "sev-high"
                              : issue.severity === "Medium"
                              ? "sev-medium"
                              : "sev-low"
                          }`}
                        >
                          {issue.severity}
                        </span>
                      </td>
                      <td>{issue.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Run Agent button */}
            <button
              className="btn-secondary"
              onClick={handleRunAgent}
              disabled={agentRunning}
            >
              {agentRunning ? "Running Agent..." : "Run Agent"}
            </button>

            {/* Agent summary box */}
            {agentSummary && (
              <div className="agent-box">
                <h3>AI Agent Summary</h3>
                <p>{agentSummary}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExternalScan;
