// src/pages/History.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CodeScan.css"; // reuse same card + table styles

function History() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all | code | external

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:8000/history");
        const rows = (res.data || []).map((row) => ({
          ...row,
          created_at: row.created_at ? new Date(row.created_at) : null,
        }));
        setItems(rows);
      } catch (err) {
        console.error(err);
        setError("Failed to load history. Please check backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredItems =
    filter === "all"
      ? items
      : items.filter((item) => item.type === filter);

  const totalScans = items.length;
  const avgScore =
    items.length > 0
      ? Math.round(
          items.reduce((sum, s) => sum + (s.score || 0), 0) / items.length
        )
      : 0;

  const lastScan = items[0];

  return (
    <div className="code-scan-page">
      <div className="code-scan-card">
        {/* HEADER */}
        <div className="code-scan-header">
          <span className="code-scan-icon">🕒</span>
          <h1>Scan History</h1>
        </div>

        {/* TOP STATS */}
        <div className="history-stats-row">
          <div className="history-stat-card">
            <div className="history-stat-label">Total Scans</div>
            <div className="history-stat-value">{totalScans}</div>
          </div>
          <div className="history-stat-card">
            <div className="history-stat-label">Average Score</div>
            <div className="history-stat-value">
              {items.length ? `${avgScore} / 100` : "—"}
            </div>
          </div>
          <div className="history-stat-card">
            <div className="history-stat-label">Last Scan</div>
            <div className="history-stat-value">
              {lastScan && lastScan.created_at
                ? lastScan.created_at.toLocaleString()
                : "—"}
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="history-filters">
          <button
            className={
              filter === "all"
                ? "history-filter-btn active"
                : "history-filter-btn"
            }
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={
              filter === "code"
                ? "history-filter-btn active"
                : "history-filter-btn"
            }
            onClick={() => setFilter("code")}
          >
            Code Scans
          </button>
          <button
            className={
              filter === "external"
                ? "history-filter-btn active"
                : "history-filter-btn"
            }
            onClick={() => setFilter("external")}
          >
            External Scans
          </button>
        </div>

        {/* CONTENT */}
        {loading && <div className="history-info">Loading history…</div>}
        {error && <div className="code-scan-error">{error}</div>}

        {!loading && !error && (
          <div className="scan-table-wrapper">
            <table className="scan-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Target</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No scans yet for this filter.
                    </td>
                  </tr>
                )}

                {filteredItems.map((scan, idx) => (
                  <tr key={scan.id || idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <span className="history-tag">
                        {scan.type === "code" ? "Code" : "External"}
                      </span>
                    </td>
                    <td className="history-target-cell">{scan.target}</td>
                    <td>
                      <span
                        className={`history-status history-status-${
                          (scan.status || "unknown").toLowerCase()
                        }`}
                      >
                        {scan.status || "unknown"}
                      </span>
                    </td>
                    <td>{scan.score != null ? scan.score : "-"}</td>
                    <td>
                      {scan.created_at
                        ? scan.created_at.toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
