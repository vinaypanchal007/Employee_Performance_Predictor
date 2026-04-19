from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from pathlib import Path
import os

app = Flask(__name__)

MODEL_PATH = Path(__file__).resolve().parent / "emp_perf_model.joblib"

try:
    model = joblib.load(MODEL_PATH) if MODEL_PATH.exists() else None
except Exception as e:
    print(f"[WARN] Failed to load model: {e}")
    model = None


def _to_float(value, default=0.0):
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _prepare_payload(data):
    payload = dict(data or {})

    payload.setdefault("Efficiency", _to_float(payload.get("Projects_Completed")))
    payload.setdefault("Workload", _to_float(payload.get("Work_Life_Balance")))
    payload.setdefault("Career_Growth", _to_float(payload.get("Last_Promotion_Years")))
    payload.setdefault("Satisfaction_Index", _to_float(payload.get("Job_Satisfaction")))
    payload.setdefault(
        "Training_Hours_Per_Year",
        max(0.0, _to_float(payload.get("Certifications")) * 20.0),
    )

    monthly_salary = (
        20000.0
        + _to_float(payload.get("Experience_Years")) * 2500.0
        + _to_float(payload.get("Manager_Rating")) * 4000.0
    )
    payload.setdefault("Log_Monthly_Salary", float(np.log1p(max(monthly_salary, 1.0))))

    feature_order = list(getattr(model, "feature_names_in_", []))
    if feature_order:
        return {feature: payload.get(feature, 0) for feature in feature_order}
    return payload


@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({
            "error": "Model file not found",
            "details": f"Expected model at {MODEL_PATH}"
        }), 500

    data = request.json
    prepared_data = _prepare_payload(data)
    df = pd.DataFrame([prepared_data])

    prediction = model.predict(df)[0]

    return jsonify({"prediction": int(prediction)})


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model_loaded": model is not None})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
