# ⚠️ IMPORTANT: Model File Fix

The `emp_perf_model.joblib` file in this repo is currently an **empty placeholder**.
You must replace it with your actual trained model before deploying.

## Steps to fix

### 1. Replace the model file
Copy your real trained model file into:
```
backend/flask_api/emp_perf_model.joblib
```

Then commit it:
```bash
git add backend/flask_api/emp_perf_model.joblib
git commit -m "Add trained model file"
git push
```

> **If your model file is large (>50MB):** Use Git LFS:
> ```bash
> git lfs install
> git lfs track "*.joblib"
> git add .gitattributes
> git add backend/flask_api/emp_perf_model.joblib
> git commit -m "Add model via Git LFS"
> git push
> ```

---

### 2. Deploy to Render

1. Push all changed files (app.py, requirements.txt, server.js, render.yaml) to GitHub.
2. Go to [render.com](https://render.com) → New → Blueprint → connect your repo.
3. Render will auto-detect `render.yaml` and create both services.
4. After the **Flask service** is deployed, copy its public URL (e.g. `https://flask-api.onrender.com`).
5. Go to the **Node service** → Environment → set `FLASK_API_URL` to that Flask URL.
6. Redeploy the Node service.

### 3. Set your frontend env var
In `frontend/.env` (or Vercel dashboard):
```
REACT_APP_API_BASE_URL=https://node-server.onrender.com
```
