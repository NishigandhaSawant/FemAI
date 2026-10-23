import os
import logging
from pathlib import Path
from typing import Optional, Tuple, Dict, Any
import joblib
import pandas as pd
from backend.schemas.prediction import PCOSPredictionRequest

logger = logging.getLogger("femai.model_service")

# Exact 10 features expected by the trained Linear SVM pipeline
EXPECTED_FEATURES = [
    "Age",
    "BMI",
    "Menstrual Regularity",
    "Hirsutism",
    "Acne Severity",
    "Family History of PCOS",
    "Insulin Resistance",
    "Lifestyle Score",
    "Stress Levels",
    "Fertility Concerns"
]

class ModelService:
    def __init__(self):
        self.model = None
        self.model_path: Optional[Path] = None
        self._load_model()

    def _find_model_file(self) -> Optional[Path]:
        possible_paths = [
            Path(__file__).parent.parent / "models" / "femai_svm_model.pkl",
            Path.cwd() / "backend" / "models" / "femai_svm_model.pkl",
            Path.cwd() / "femai_svm_model.pkl",
            Path(__file__).parent.parent.parent / "femai_svm_model.pkl",
        ]
        for p in possible_paths:
            if p.exists() and p.is_file():
                return p.resolve()
        return None

    def _load_model(self):
        found_path = self._find_model_file()
        if not found_path:
            logger.error("Linear SVM model artifact 'femai_svm_model.pkl' not found.")
            return

        try:
            self.model_path = found_path
            self.model = joblib.load(found_path)
            logger.info("Successfully loaded Linear SVM model from %s", self.model_path.name)
        except Exception as e:
            logger.error("Failed to load model from %s: %s", found_path, str(e))
            self.model = None

    def is_loaded(self) -> bool:
        return self.model is not None

    def predict(self, req: PCOSPredictionRequest) -> Tuple[str, float]:
        if not self.is_loaded():
            raise RuntimeError("ML model is not loaded. Ensure femai_svm_model.pkl is present and dependencies are installed.")

        # Construct DataFrame with exact column names and expected ordering
        input_data = {
            "Age": float(req.Age),
            "BMI": str(req.BMI),
            "Menstrual Regularity": str(req.Menstrual_Regularity),
            "Hirsutism": str(req.Hirsutism),
            "Acne Severity": str(req.Acne_Severity),
            "Family History of PCOS": str(req.Family_History_of_PCOS),
            "Insulin Resistance": str(req.Insulin_Resistance),
            "Lifestyle Score": float(req.Lifestyle_Score),
            "Stress Levels": str(req.Stress_Levels),
            "Fertility Concerns": str(req.Fertility_Concerns)
        }

        df = pd.DataFrame([input_data], columns=EXPECTED_FEATURES)

        try:
            raw_pred = self.model.predict(df)[0]
            # Linear SVM returns binary 0 or 1
            prediction_label = "Positive" if int(raw_pred) == 1 else "Negative"

            raw_score = 0.0
            if hasattr(self.model, "decision_function"):
                raw_score = float(self.model.decision_function(df)[0])

            # Technical logging without logging patient questionnaire answers
            logger.info("Executed prediction: label=%s (raw_score=%.4f)", prediction_label, raw_score)

            return prediction_label, raw_score
        except Exception as e:
            logger.error("Error during model inference: %s", str(e))
            raise e

    def get_info(self) -> Dict[str, Any]:
        return {
            "model_name": "FemAI Linear SVM Pipeline",
            "model_type": "LinearSVC with SimpleImputer, StandardScaler, and OneHotEncoder",
            "target": "Diagnosis (0 = No, 1 = Yes)",
            "features": EXPECTED_FEATURES,
            "categorical_options": {
                "BMI": ["Normal", "Overweight", "Obese", "Underweight"],
                "Menstrual Regularity": ["Regular", "Irregular"],
                "Hirsutism": ["Yes", "No"],
                "Acne Severity": ["Mild", "Moderate", "Severe", "Not recorded"],
                "Family History of PCOS": ["Yes", "No"],
                "Insulin Resistance": ["Yes", "No"],
                "Stress Levels": ["Low", "Medium", "High"],
                "Fertility Concerns": ["Yes", "No"]
            },
            "numerical_ranges": {
                "Age": {"min": 15.0, "max": 50.0, "median": 32.0},
                "Lifestyle Score": {"min": 1.0, "max": 10.0, "median": 6.0}
            },
            "metrics": {
                "accuracy": 0.581,
                "precision": 0.141,
                "recall": 0.483,
                "f1_score": 0.218
            },
            "disclaimer": "FemAI is an experimental educational and risk-awareness prototype. It is NOT a clinical diagnosis and does not provide medical probabilities."
        }

# Singleton instance
model_service = ModelService()
