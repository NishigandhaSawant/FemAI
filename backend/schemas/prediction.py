from pydantic import BaseModel, Field, field_validator
from typing import Optional, Literal

class PCOSPredictionRequest(BaseModel):
    Age: float = Field(..., ge=10, le=90, description="Age in years (typically 15-50 in dataset)")
    BMI: Literal["Normal", "Overweight", "Obese", "Underweight"] = Field(..., description="BMI category")
    Menstrual_Regularity: Literal["Regular", "Irregular"] = Field(..., alias="Menstrual Regularity")
    Hirsutism: Literal["Yes", "No"] = Field(..., description="Presence of excess hair growth")
    Acne_Severity: Optional[str] = Field("Not recorded", alias="Acne Severity", description="Mild, Moderate, Severe, or Not recorded")
    Family_History_of_PCOS: Literal["Yes", "No"] = Field(..., alias="Family History of PCOS")
    Insulin_Resistance: Literal["Yes", "No"] = Field(..., alias="Insulin Resistance")
    Lifestyle_Score: float = Field(..., ge=1, le=10, alias="Lifestyle Score", description="Score from 1 to 10")
    Stress_Levels: Literal["Low", "Medium", "High"] = Field(..., alias="Stress Levels")
    Fertility_Concerns: Literal["Yes", "No"] = Field(..., alias="Fertility Concerns")

    @field_validator("Acne_Severity", mode="before")
    @classmethod
    def validate_acne_severity(cls, v):
        if v is None or v == "" or str(v).strip().lower() in ["none", "nan", "not recorded", "null", "not_recorded"]:
            return "Not recorded"
        normalized = str(v).strip().capitalize()
        if normalized in ["Mild", "Moderate", "Severe"]:
            return normalized
        if normalized in ["Not recorded", "Not Recorded"]:
            return "Not recorded"
        raise ValueError("Acne Severity must be one of: 'Mild', 'Moderate', 'Severe', or 'Not recorded'")

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
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
        }
    }


class PCOSPredictionResponse(BaseModel):
    prediction: Literal["Positive", "Negative"]
    result_type: str = "experimental_model_classification"
    raw_decision_score: Optional[float] = None
    disclaimer: str = "This experimental output is not a medical diagnosis. Please consult a healthcare professional for clinical advice."


class ModelInfoResponse(BaseModel):
    model_name: str
    model_type: str
    target: str
    features: list[str]
    categorical_options: dict[str, list[str]]
    numerical_ranges: dict[str, dict[str, float]]
    metrics: dict[str, float]
    disclaimer: str
