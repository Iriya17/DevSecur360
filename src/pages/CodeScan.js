// src/pages/CodeScan.js
import React, { useState } from "react";
import "./CodeScan.css";

const API_BASE = "http://localhost:8000";

export default function CodeScan() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [agentSummary, setAgentSummary] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
    setResult(null);
    setAgentSummary("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a source code file first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const formData = new FormData();
      formData.append("codefile", file);

      const res = await fetch(`${API_BASE}/scan-file`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("scan error:", err);
      setError("Scan failed. Please check backend and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRunAgent = () => {
    if (!result) return;

    const { score, issues } = result;
    const high = issues.filter((i) => i.severity && i.severity.toLowerCase() === "high").length;
    const medium = issues.filter((i) => i.severity && i.severity.toLowerCase() === "medium").length;
    const low = issues.filter((i) => i.severity && i.severity.toLowerCase() === "low").length;

    const text = `Overall security score: ${score}. High-risk findings: ${high}, medium: ${medium}, low: ${low}. Focus first on high-risk vulnerabilities, then fix medium issues, and finally clean up low-risk findings.`;
    setAgentSummary(text);
  };

  return (
    <div className="code-scan-page">
      <div className="code-scan-card">
        <div className="code-scan-header">
          <span className="code-scan-icon">🧠</span>
          <h1>Source Code Security Scan</h1>
        </div>

        <form onSubmit={handleSubmit} className="code-scan-form">
          <div className="code-scan-dropzone">
            <input
              type="file"
              accept=".py,.js,.ts,.java,.php,.rb,.go,.c,.cpp,.cs,.txt"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Scanning..." : "Start Scan"}
          </button>
        </form>

        <p className="code-scan-formats">
          Supported formats:&nbsp;<strong>Python, JavaScript, Java, C / C++, PHP, Ruby, Go</strong>
        </p>

        {error && <div className="code-scan-error">{error}</div>}

        {result && (
          <div className="scan-result">
            <div className="scan-score-badge">Score: <span>{result.score}</span></div>

            <div className="scan-summary-header"><h2>Scan Summary</h2></div>

            <div className="scan-table-wrapper">
              <table className="scan-table">
                <thead>
                  <tr><th>#</th><th>Issue</th><th>Severity</th><th>Location</th></tr>
                </thead>
                <tbody>
                  {result.issues.map((issue, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{issue.vulnerability}</td>
                      <td className={`sev sev-${issue.severity ? issue.severity.toLowerCase() : "medium"}`}>{issue.severity}</td>
                      <td>{issue.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button type="button" className="btn-secondary" onClick={handleRunAgent}>Run Agent</button>

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
