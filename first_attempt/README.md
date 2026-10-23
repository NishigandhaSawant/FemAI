# 📓 First Attempt Archive

This directory preserves the original research artifacts, legacy data exploration, and first-attempt prototype materials for **FemAI**:

- **`femai.ipynb`**: Original exploratory Jupyter Notebook containing the initial PCOS dataset analysis and model training workflow.
- **`old_model/`**: Legacy trained weights (`pcos_model.pkl`) and feature scaler (`scaler.pkl`).
- **`archive (2)/` & `pcos_prediction_dataset_ (1).csv`**: Initial datasets explored during the early phase of the project.
- **Documentation & Presentations**:
  - `FemAI Project Documentation.pdf`
  - `4_FemAI.pdf`
  - `femai_hm_rev.pptx` & `femm.pptx`

> **Note:** The active production codebase is organized into modular directories at the project root:
> - **[`/backend`](../backend)**: FastAPI REST API with the trained Linear SVM pipeline (`femai_svm_model.pkl`).
> - **[`/frontend`](../frontend)**: React + Vite + Tailwind neuromorphic web application.
