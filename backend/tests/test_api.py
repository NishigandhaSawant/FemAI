import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.services.model_service import model_service

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["app"] == "FemAI API"
    assert data["status"] == "online"

def test_health_check():
    response = client.get("/health")
    assert response.status_code in [200, 503]
    data = response.json()
    assert "status" in data
    assert "model_loaded" in data

def test_model_info():
    response = client.get("/model-info")
    assert response.status_code == 200
    data = response.json()
    assert "model_name" in data
    assert "features" in data
    assert len(data["features"]) == 10

def test_predict_valid_sample():
    payload = {
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
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["prediction"] in ["Positive", "Negative"]
    assert "raw_decision_score" in data
    assert "disclaimer" in data

def test_predict_invalid_age():
    payload = {
        "Age": 150,  # invalid age > 90
        "BMI": "Normal",
        "Menstrual Regularity": "Regular",
        "Hirsutism": "No",
        "Acne Severity": "Mild",
        "Family History of PCOS": "No",
        "Insulin Resistance": "No",
        "Lifestyle Score": 5,
        "Stress Levels": "Low",
        "Fertility Concerns": "No"
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 422

def test_predict_invalid_category():
    payload = {
        "Age": 28,
        "BMI": "SuperObese",  # invalid category
        "Menstrual Regularity": "Regular",
        "Hirsutism": "No",
        "Acne Severity": "Mild",
        "Family History of PCOS": "No",
        "Insulin Resistance": "No",
        "Lifestyle Score": 7,
        "Stress Levels": "Low",
        "Fertility Concerns": "No"
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 422

def test_predict_missing_field():
    payload = {
        "Age": 28,
        "BMI": "Normal"
        # missing other 8 required fields
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 422

def test_predict_acne_not_recorded():
    payload = {
        "Age": 24,
        "BMI": "Normal",
        "Menstrual Regularity": "Regular",
        "Hirsutism": "No",
        "Acne Severity": "Not recorded",
        "Family History of PCOS": "No",
        "Insulin Resistance": "No",
        "Lifestyle Score": 8,
        "Stress Levels": "Low",
        "Fertility Concerns": "No"
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["prediction"] in ["Positive", "Negative"]
