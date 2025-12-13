// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CodeScan from "./pages/CodeScan";
import ExternalScan from "./pages/ExternalScan";
import History from "./pages/History";
import About from "./pages/About";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/codescan" element={<CodeScan />} />
          <Route path="/externalscan" element={<ExternalScan />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
          {/* fallback */}
          <Route path="*" element={<div style={{padding:48,color:'#fff'}}>Page not found</div>} />
        </Routes>
      </main>
    </Router>
  );
}
