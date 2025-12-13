// DevSecur360 simple demo backend (dummy data, no DB)
// --------------------------------------------------

import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// store scans in memory for /history
let scans = [];

// file uploads (for code scan)
const upload = multer({ dest: "tmp/" });

// Root route – quick health check
app.get("/", (req, res) => {
  res.json({ message: "DevSecur360 Backend Active (dummy mode)" });
});

/* ----------------------------------------------------
   CODE SCAN: /scan-file   (used by CodeScan.js)
   Expects multipart/form-data with key "codefile"
   Returns: { scanId, score, issues:[...] }
-----------------------------------------------------*/
app.post("/scan-file", upload.single("codefile"), (req, res) => {
  // we ignore real file contents in dummy mode
  const fileName = req.file ? req.file.originalname : "uploaded-file";

  const scanId = `code-${Date.now()}`;

  const issues = [
    {
      vulnerability: "Dangerous shell execution",
      severity: "High",
      location: "Line 2",
      description: "Use of os.system / subprocess with shell=True.",
    },
    {
      vulnerability: "Hardcoded API key",
      severity: "Medium",
      location: "Line 8",
      description: "API keys or tokens appear directly in source code.",
    },
    {
      vulnerability: "Debug logging enabled",
      severity: "Low",
      location: "Line 1",
      description: "Verbose debug logs may leak sensitive runtime data.",
    },
  ];

  const score = 60;

  // push into in-memory history
  scans.push({
    id: scanId,
    type: "code",
    target: fileName,
    score,
    createdAt: new Date().toISOString(),
  });

  return res.json({ scanId, score, issues });
});

/* ----------------------------------------------------
   EXTERNAL WEB SCAN: /external-scan   (ExternalScan.js)
   Expects JSON { url }
   Returns: { scanId, score, issues:[...] }
-----------------------------------------------------*/
app.post("/external-scan", (req, res) => {
  const { url } = req.body || {};
  const target = url && url.trim() ? url.trim() : "https://example.com";

  const scanId = `external-${Date.now()}`;

  const issues = [
    {
      vulnerability: "Missing Content Security Policy (CSP)",
      severity: "Medium",
      location: target,
      description:
        "CSP header not set. Page may be vulnerable to cross-site scripting (XSS).",
    },
    {
      vulnerability: "HSTS not enabled",
      severity: "Low",
      location: target,
      description: "Strict-Transport-Security header is missing.",
    },
    {
      vulnerability: "Clickjacking risk (X-Frame-Options)",
      severity: "High",
      location: target,
      description:
        "X-Frame-Options or frame-ancestors policy is not set. Site can be embedded in iframes.",
    },
  ];

  const score = 70;

  scans.push({
    id: scanId,
    type: "external",
    target,
    score,
    createdAt: new Date().toISOString(),
  });

  return res.json({ scanId, score, issues });
});

/* ----------------------------------------------------
   HISTORY: /history   (if you show it in History page)
-----------------------------------------------------*/
app.get("/history", (req, res) => {
  // newest first
  res.json(scans.slice().reverse());
});

/* ----------------------------------------------------
   START SERVER
-----------------------------------------------------*/
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`DevSecur360 backend running on port ${PORT} (dummy mode)`);
});
