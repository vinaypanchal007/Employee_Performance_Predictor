import { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const numberFields = [
  "Age",
  "Experience_Years",
  "Performance_Score",
  "Attendance_Rate",
];

const stringFields = [
  "Department",
  "Job_Title",
  "Education",
  "Employment_Type",
];

export default function PredictPage() {
  const [formData, setFormData] = useState({
    Age: "",
    Experience_Years: "",
    Performance_Score: "",
    Attendance_Rate: "",
    Department: "",
    Job_Title: "",
    Education: "",
    Employment_Type: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/predict`, formData);
      setPrediction(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.message ||
          "An error occurred while making the prediction"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      Age: "",
      Experience_Years: "",
      Performance_Score: "",
      Attendance_Rate: "",
      Department: "",
      Job_Title: "",
      Education: "",
      Employment_Type: "",
    });
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="predict-container">
      <h1>Employee Performance Prediction</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          {numberFields.map((field) => (
            <div key={field} className="form-group">
              <label htmlFor={field}>{field.replace(/_/g, " ")}:</label>
              <input
                type="number"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field.replace(/_/g, " ").toLowerCase()}`}
                step="0.01"
                required
              />
            </div>
          ))}
        </div>

        <div className="form-row">
          {stringFields.map((field) => (
            <div key={field} className="form-group">
              <label htmlFor={field}>{field.replace(/_/g, " ")}:</label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field.replace(/_/g, " ").toLowerCase()}`}
                required
              />
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Predict"}
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      {prediction && (
        <div className="prediction-result">
          <h2>Prediction Result</h2>
          <p>
            <strong>Promotion Eligibility:</strong>{" "}
            {prediction.promotion_eligibility}
          </p>
          <p>
            <strong>Confidence Score:</strong> {prediction.confidence_score}%
          </p>
          {prediction.recommendations && (
            <div>
              <strong>Recommendations:</strong>
              <ul>
                {prediction.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
