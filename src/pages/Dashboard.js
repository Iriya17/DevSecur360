import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const lineData = [
  { date: "07 Nov", code: 0, external: 0 },
  { date: "08 Nov", code: 900, external: 400 },
  { date: "09 Nov", code: 50, external: 20 },
  { date: "10 Nov", code: 200, external: 150 },
  { date: "11 Nov", code: 780, external: 600 },
  { date: "12 Nov", code: 820, external: 500 },
  { date: "13 Nov", code: 100, external: 80 },
];

const codeSeverityData = [
  { name: "High", value: 120 },
  { name: "Medium", value: 690 },
  { name: "Low", value: 300 },
];

const externalSeverityData = [
  { name: "High", value: 20 },
  { name: "Medium", value: 130 },
  { name: "Low", value: 90 },
];

const COLORS = ["#f97373", "#facc15", "#4ade80"];

const recentScans = [
  {
    name: "Code Scan",
    date: "13/11/2025, 9:39:27 pm",
    high: 11,
    medium: 13,
    low: 7,
  },
  {
    name: "External Scan",
    date: "13/11/2025, 9:28:33 pm",
    high: 0,
    medium: 3,
    low: 25,
  },
  {
    name: "Code Scan",
    date: "13/11/2025, 9:25:06 pm",
    high: 11,
    medium: 13,
    low: 7,
  },
  {
    name: "Code Scan",
    date: "13/11/2025, 1:52:55 pm",
    high: 2,
    medium: 4,
    low: 1,
  },
  {
    name: "Code Scan",
    date: "12/11/2025, 10:47:26 pm",
    high: 55,
    medium: 65,
    low: 35,
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-root page-root">
      <section className="card full-width-card">
        <h2 className="card-title">Scan Trends</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lineData} margin={{ left: -20, right: 10 }}>
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ background: "#0b1220", border: "1px solid #1f2937" }}
                labelStyle={{ color: "#e5e7eb" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="code"
                name="Code"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="external"
                name="External"
                stroke="#a5b4fc"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="cards-row">
        <div className="card half-card">
          <h3 className="card-title center">Code Scan Severity</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={codeSeverityData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {codeSeverityData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#0b1220", border: "1px solid #1f2937" }}
                  labelStyle={{ color: "#e5e7eb" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card half-card">
          <h3 className="card-title center">External Scan Severity</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={externalSeverityData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {externalSeverityData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#0b1220", border: "1px solid #1f2937" }}
                  labelStyle={{ color: "#e5e7eb" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="cards-row">
        <div className="card stats-card">
          <p>
            Total Scans: <span className="stats-number">108</span>
          </p>
          <p>
            Last Scan: <span className="stats-number">7 minutes ago</span>
          </p>
          <p>
            Average Risk Level: <span className="stats-number">Medium</span>
          </p>
        </div>
      </section>

      <section className="card full-width-card">
        <h3 className="card-title">Recent Scans</h3>
        <div className="table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                <th>Scan Name</th>
                <th>Date</th>
                <th>High</th>
                <th>Medium</th>
                <th>Low</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.name}</td>
                  <td>{row.date}</td>
                  <td className="severity-high">{row.high}</td>
                  <td className="severity-medium">{row.medium}</td>
                  <td className="severity-low">{row.low}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
