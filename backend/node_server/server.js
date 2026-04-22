const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;
const FLASK_API_URL = process.env.FLASK_API_URL || "http://127.0.0.1:5000";

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({ status: "ok", flask_url: FLASK_API_URL });
});

app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post(`${FLASK_API_URL}/predict`, req.body, {
      timeout: 10000,
    });
    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message;
    console.error(`[Flask Error] ${status}:`, message);
    res.status(status).json({ error: "Flask API error", details: message });
  }
});

app.listen(PORT, () => {
  console.log(`Node server running on port ${PORT}`);
  console.log(`Forwarding to Flask at: ${FLASK_API_URL}`);
});
