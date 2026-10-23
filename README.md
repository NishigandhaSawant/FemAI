# 🌸 FemAI — Full-Stack PCOS Risk Awareness & Wellness Platform

[![Python](https://img.shields.io/badge/Python-3.11%20%7C%203.12-blue?logo=python)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-1.6.1-F7931E?logo=scikit-learn&logoColor=white)](https://scikit-learn.org)

**FemAI** is an educational, full-stack risk-awareness platform for Polycystic Ovary Syndrome (PCOS). It couples a calibrated machine learning screening pipeline (Linear SVM) with a soft neuromorphic, accessible user interface to promote informed health conversations and holistic wellness habits.

> **Responsible Health Notice:**  
> FemAI is an **educational screening prototype** and **NOT a diagnostic medical device**. It does not calculate clinical probabilities or replace clinical diagnosis, hormonal panels, or pelvic ultrasound.

---

## ✨ Key Features

- **Soft Neuromorphic Design**: Thoughtful, calming palette (`#FFF8F5`, `#E9A8B8`, `#493941`) with rounded geometry, tactile inputs, and accessible typography (*Plus Jakarta Sans*).
- **10-Feature Symptom Assessment**: Interactive multi-step questionnaire evaluating clinical indicators (Age, BMI, Menstrual Regularity, Hirsutism, Acne, Family History, Insulin Resistance, Lifestyle Score, Stress, and Fertility Concerns).
- **Transparent ML Classification**: Utilizes an scikit-learn `LinearSVC` pipeline with preprocessing (`SimpleImputer`, `StandardScaler`, `OneHotEncoder`).
- **Holistic Wellness Dashboard**: Evidence-informed lifestyle pillars (nutrition, stress management, restorative movement, sleep hygiene) and daily habit checklists.
- **Privacy-First**: Zero client data persistence; evaluations run ephemerally with sanitized backend logging.

---

## 📁 Repository Structure

```
FemAI/
├── backend/                        # FastAPI REST API backend
│   ├── main.py                     # API routes, CORS & error handling
│   ├── requirements.txt            # Python dependencies
│   ├── models/
│   │   └── femai_svm_model.pkl     # Trained Linear SVM pipeline
│   ├── schemas/                    # Pydantic v2 validation models
│   ├── services/                   # Model loading & inference service
│   └── tests/                      # Automated test suite (Pytest)
├── frontend/                       # React 18 + Vite frontend
│   ├── src/
│   │   ├── components/             # Reusable UI (Navbar, Footer, Disclaimers)
│   │   ├── pages/                  # Home, Assessment, Results, Dashboard, About
│   │   └── services/               # API client & recommendations
│   ├── index.html
│   └── tailwind.config.js
├── first_attempt/                  # 📓 Archived Initial Research & Notebooks
│   ├── femai.ipynb                 # First-attempt model exploration notebook
│   ├── old_model/                  # Legacy model weights & scalers
│   └── README.md                   # Archive summary & notes
├── femai_svm_model.pkl             # Root model artifact
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python 3.11 or 3.12**
- **Node.js (v18+)** and **npm**

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate a virtual environment
# Windows (PowerShell):
python -m venv venv
.\venv\Scripts\Activate.ps1
# macOS/Linux:
# python3 -m venv venv && source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```
- API Base: `http://127.0.0.1:8000`
- Swagger Docs: `http://127.0.0.1:8000/docs`
- Health Check: `http://127.0.0.1:8000/health`

### 2. Frontend Setup

```bash
# Navigate to frontend directory (in a second terminal)
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
- Web Application: **`http://localhost:5173`**

---

## 🔬 Machine Learning Pipeline

- **Algorithm**: `LinearSVC(class_weight='balanced', max_iter=3000, random_state=42)`
- **Feature Pipeline**:
  - *Numerical (`Age`, `Lifestyle Score`)*: `SimpleImputer(median)` + `StandardScaler`
  - *Categorical (`BMI`, `Menstrual Regularity`, `Hirsutism`, `Acne Severity`, etc.)*: `OneHotEncoder(handle_unknown='ignore')`
- **Model Transparency & Limitation**:
  - In highly imbalanced health datasets (~88% negative in historical research cohorts), linear models produce higher false-positive rates (14.1% positive precision, 48.3% recall).
  - Raw SVM decision scores represent geometric distance to the separating hyperplane and are **never represented as clinical percentage probabilities**.

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status and metadata |
| `GET` | `/health` | Health check & model readiness indicator |
| `GET` | `/model-info` | Feature schema, category definitions & metrics |
| `POST` | `/predict` | Evaluates 10 symptoms and returns classification |

**Sample `/predict` Request:**
```json
{
  "Age": 25,
  "BMI": "Overweight",
  "Menstrual Regularity": "Irregular",
  "Hirsutism": "Yes",
  "Acne Severity": "Moderate",
  "Family History of PCOS": "No",
  "Insulin Resistance": "No",
  "Lifestyle Score": 5,
  "Stress Levels": "High",
  "Fertility Concerns": "Yes"
}
```

---

## 🛡️ Responsible AI & Privacy

1. **No Data Storage**: Form inputs are processed in-memory during inference and are never saved to a database or shared.
2. **Transparent Metrics**: False-positive limitations are documented openly in the application.
3. **Graceful Degraded State**: If the backend is unreachable, the UI provides informative diagnostic guidance.

---

## 📄 License

This project is licensed under the MIT License - see the repository for details.
