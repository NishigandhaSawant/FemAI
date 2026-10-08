from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd

app = FastAPI(title="FemAI Screening API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows requests from any frontend origin during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load saved model and scaler
try:
    with open("pcos_model.pkl", "rb") as f:
        model = pickle.load(f)
    with open("scaler.pkl", "rb") as f:
        scaler = pickle.load(f)
except FileNotFoundError:
    print("Error: Ensure pcos_model.pkl and scaler.pkl are inside the backend directory.")

class PatientData(BaseModel):
    features: dict

@app.get("/")
def home():
    return {"message": "FemAI Backend Engine is Running"}

@app.post("/predict")
def predict_pcos(data: PatientData):
    try:
        df = pd.DataFrame([data.features])
        scaled_features = scaler.transform(df)
        prediction = model.predict(scaled_features)
        probability = model.predict_proba(scaled_features)[0][1]
        
        return {
            "pcos_detected": bool(prediction[0]),
            "risk_probability": round(float(probability) * 100, 2),
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))