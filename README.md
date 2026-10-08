# FemAI

An Intelligent PCOS Screening and Lifestyle Guidance Platform.

## Setup Instructions

### Backend
1. Navigate to the backend folder: `cd backend`
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: `venv\Scripts\activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run the server: `uvicorn main:app --reload` (Runs on http://127.0.0.1:8000)

### Frontend
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev` (Runs on http://localhost:5173)

The AI model files (`pcos_model.pkl` and `scaler.pkl`) are included in the backend directory.
