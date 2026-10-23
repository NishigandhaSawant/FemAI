/**
 * FemAI API Service
 * Encapsulates all communication with the FastAPI backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8001';

/**
 * Checks backend health and model readiness
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      return {
        online: false,
        modelLoaded: false,
        message: `Backend returned status ${response.status}`,
      };
    }
    const data = await response.json();
    return {
      online: true,
      modelLoaded: !!data.model_loaded,
      message: data.message,
    };
  } catch (error) {
    return {
      online: false,
      modelLoaded: false,
      message: 'Backend server is currently offline or unreachable at ' + API_BASE_URL,
    };
  }
}

/**
 * Fetches model metadata and feature configurations
 */
export async function getModelInfo() {
  try {
    const response = await fetch(`${API_BASE_URL}/model-info`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to retrieve model info: HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Model info fetch error:', error);
    throw error;
  }
}

/**
 * Submits the completed 10-feature assessment to POST /predict
 * 
 * @param {Object} formData 
 * @returns {Promise<Object>} { prediction: "Positive"|"Negative", result_type, disclaimer, raw_decision_score }
 */
export async function submitAssessment(formData) {
  // Format payload according to exact model requirements
  const payload = {
    Age: Number(formData.age),
    BMI: formData.bmi,
    "Menstrual Regularity": formData.menstrualRegularity,
    Hirsutism: formData.hirsutism,
    "Acne Severity": formData.acneSeverity || "Not recorded",
    "Family History of PCOS": formData.familyHistory,
    "Insulin Resistance": formData.insulinResistance,
    "Lifestyle Score": Number(formData.lifestyleScore),
    "Stress Levels": formData.stressLevels,
    "Fertility Concerns": formData.fertilityConcerns,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorMessage = 'Prediction failed';
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map(d => `${d.loc?.join('.') || 'field'}: ${d.msg}`).join(', ');
          } else {
            errorMessage = errorData.detail;
          }
        }
      } catch (_) {
        errorMessage = `Server error (HTTP ${response.status})`;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Assessment submission failed:', error);
    // Explicitly rethrow to ensure caller handles the real failure without inventing a fake prediction
    throw error;
  }
}
