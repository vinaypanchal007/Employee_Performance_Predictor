const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;
const FLASK_API_URL = process.env.FLASK_API_URL || "http://127.0.0.1:5000";

app.use(express.json());
app.use(cors());

app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post(`${FLASK_API_URL}/predict`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Flask API error" });
  }
});

app.listen(PORT, () => {
  console.log(`Node server running on port ${PORT}`);
});