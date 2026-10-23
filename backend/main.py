import logging
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.schemas.prediction import (
    PCOSPredictionRequest,
    PCOSPredictionResponse,
    ModelInfoResponse
)
from backend.services.model_service import model_service

# Setup clean technical logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("femai.api")

app = FastAPI(
    title="FemAI - PCOS Risk Awareness & Wellness API",
    description="Educational prototype API using an experimental Linear SVM model for PCOS symptom pattern analysis.",
    version="1.0.0"
)

# CORS configuration for local development
ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/", tags=["General"])
def read_root():
    """API root status endpoint."""
    return {
        "app": "FemAI API",
        "status": "online",
        "version": "1.0.0",
        "description": "PCOS risk-awareness & lifestyle guidance platform"
    }


@app.get("/health", tags=["Health"])
def health_check():
    """Health check for application and model availability."""
    model_loaded = model_service.is_loaded()
    status_code = status.HTTP_200_OK if model_loaded else status.HTTP_503_SERVICE_UNAVAILABLE
    
    return JSONResponse(
        status_code=status_code,
        content={
            "status": "healthy" if model_loaded else "degraded",
            "model_loaded": model_loaded,
            "backend": "FastAPI",
            "message": "Model ready for inference" if model_loaded else "Model artifact not loaded"
        }
    )


@app.get("/model-info", response_model=ModelInfoResponse, tags=["Model"])
def get_model_info():
    """Returns model metadata, supported feature schema, and educational disclaimers."""
    return model_service.get_info()


@app.post(
    "/predict",
    response_model=PCOSPredictionResponse,
    status_code=status.HTTP_200_OK,
    tags=["Inference"]
)
def predict_pcos_risk(payload: PCOSPredictionRequest):
    """
    Submits user-reported symptom values to the saved Linear SVM model.
    Returns experimental classification without framing decision scores as medical probability.
    """
    if not model_service.is_loaded():
        logger.error("Predict requested but model service is not loaded.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The screening model is currently unavailable. Please ensure femai_svm_model.pkl is loaded."
        )

    try:
        prediction_label, decision_score = model_service.predict(payload)

        return PCOSPredictionResponse(
            prediction=prediction_label,
            result_type="experimental_model_classification",
            raw_decision_score=round(decision_score, 4),
            disclaimer="This experimental output is not a medical diagnosis. FemAI does not provide medical probabilities or replace clinical evaluation by a physician."
        )
    except Exception as exc:
        logger.error("Inference execution failure: %s", str(exc))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while evaluating the screening inputs. Please try again."
        )
