import { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const numberFields = [
  "Age",
  "Experience_Years",
  "Projects_Completed",
  "Certifications",
  "Work_Life_Balance",
  "Job_Satisfaction",
  "Manager_Rating",
  "Laptop_Issue_Count",
  "Last_Promotion_Years",
  "Absenteeism_Days",
];

const dropdownOptions = {
  Gender: ["Male", "Female", "Other"],
  City: ["Delhi", "Kolkata", "Chennai", "Pune", "Mumbai", "Hyderabad", "Bengaluru"],
  Education_Level: ["Graduate", "Post Graduate", "Diploma", "PhD"],
  Department: ["Sales", "Operations", "Analytics", "Finance", "IT", "HR"],
};

function PredictPage() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      setError("");
      const res = await axios.post(`${API_BASE_URL}/api/predict`, form);
      setResult(res.data.prediction);
    } catch (err) {
      setResult(null);
      setError("Unable to connect to prediction service. Check backend servers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <h2>Performance Prediction</h2>
      <p className="subtext">Fill in the employee details and run prediction.</p>

      <div className="form">
        <div className="section">
          {Object.keys(dropdownOptions).map((key) => (
            <div className="form-group" key={key}>
              <label className="label">{key.replaceAll("_", " ")}</label>
              <select name={key} className="input" onChange={handleChange}>
                <option value="">Select {key.replaceAll("_", " ")}</option>
                {dropdownOptions[key].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="section">
          {numberFields.map((key) => (
            <div className="form-group" key={key}>
              <label className="label">{key.replaceAll("_", " ")}</label>
              <input
                type="number"
                name={key}
                placeholder={`Enter ${key.replaceAll("_", " ")}`}
                className="input"
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <button className="button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </div>

      {result !== null && (
        <h3 className="status success">
          Prediction: {result === 0 ? "Low" : result === 1 ? "Average" : "High"}
        </h3>
      )}
      {error && <h3 className="status error">{error}</h3>}
    </section>
  );
}

export default PredictPage;
