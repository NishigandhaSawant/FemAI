import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle, 
  Activity, 
  RefreshCw 
} from 'lucide-react';
import { submitAssessment } from '../services/api';
import DisclaimerBanner from '../components/DisclaimerBanner';

export default function AssessmentPage() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    age: '25',
    bmi: 'Normal',
    menstrualRegularity: 'Regular',
    hirsutism: 'No',
    acneSeverity: 'Not recorded',
    familyHistory: 'No',
    insulinResistance: 'No',
    lifestyleScore: '6',
    stressLevels: 'Medium',
    fertilityConcerns: 'No',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (apiError) setApiError(null);
  };

  const validateStep = (step) => {
    if (step === 1) {
      const ageNum = Number(formData.age);
      if (!formData.age || isNaN(ageNum) || ageNum < 12 || ageNum > 80) {
        alert('Please enter a valid age between 12 and 80.');
        return false;
      }
      if (!formData.bmi || !formData.menstrualRegularity) {
        alert('Please select your BMI category and menstrual regularity.');
        return false;
      }
    }
    if (step === 2) {
      if (!formData.hirsutism || !formData.acneSeverity || !formData.insulinResistance) {
        alert('Please complete all questions in this section.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      const result = await submitAssessment(formData);
      navigate('/results', {
        state: {
          result,
          formData,
        },
      });
    } catch (err) {
      console.error('Submission error:', err);
      setApiError(
        err.message || 'Unable to connect to the prediction backend. Please ensure the FastAPI server is running.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fem-pinkLight/50 text-xs font-semibold text-fem-text">
          <Activity className="w-3.5 h-3.5 text-fem-pink" />
          <span>Confidential PCOS Screening</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-fem-text">
          PCOS Symptom Assessment
        </h1>
        <p className="text-sm text-fem-textMuted max-w-lg mx-auto">
          Please answer the following 10 questions as accurately as possible. FemAI evaluates these markers against trained clinical patterns.
        </p>
      </div>

      {/* Step Progress Indicator */}
      <div className="neu-card p-4 sm:p-6 bg-white/70">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
              currentStep >= 1 ? 'bg-fem-pink text-white shadow-neu-raised-sm' : 'bg-fem-cream text-fem-textMuted'
            }`}>
              1
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-fem-text">
              Demographics & Cycle
            </span>
          </div>

          <div className={`flex-1 h-1.5 mx-3 rounded-full ${
            currentStep >= 2 ? 'bg-fem-pink' : 'bg-fem-cream'
          }`} />

          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
              currentStep >= 2 ? 'bg-fem-pink text-white shadow-neu-raised-sm' : 'bg-fem-cream text-fem-textMuted'
            }`}>
              2
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-fem-text">
              Hormonal Markers
            </span>
          </div>

          <div className={`flex-1 h-1.5 mx-3 rounded-full ${
            currentStep === 3 ? 'bg-fem-pink' : 'bg-fem-cream'
          }`} />

          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
              currentStep === 3 ? 'bg-fem-pink text-white shadow-neu-raised-sm' : 'bg-fem-cream text-fem-textMuted'
            }`}>
              3
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-fem-text">
              Lifestyle & History
            </span>
          </div>

        </div>
      </div>

      {/* Main Questionnaire Card */}
      <div className="neu-card p-6 sm:p-10 bg-[#FFF9F7]">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* STEP 1: Demographics & Menstrual Cycle */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-fem-pinkLight/50 pb-3">
                <h2 className="text-xl font-bold text-fem-text">Section 1: Demographics & Cycle</h2>
                <p className="text-xs text-fem-textMuted mt-1">Foundational body markers and cycle regularity.</p>
              </div>

              {/* 1. Age */}
              <div className="space-y-2">
                <label htmlFor="age" className="block text-sm font-bold text-fem-text">
                  1. Age (Years) <span className="text-fem-pink">*</span>
                </label>
                <p className="text-xs text-fem-textMuted">Valid range: 15–50 in research dataset.</p>
                <input
                  id="age"
                  type="number"
                  min="12"
                  max="80"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  className="w-full sm:w-48 px-4 py-3 rounded-xl neu-inset text-fem-text font-semibold focus:outline-none focus:ring-2 focus:ring-fem-pink"
                  required
                />
              </div>

              {/* 2. BMI Category */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-fem-text">
                  2. BMI Category <span className="text-fem-pink">*</span>
                </label>
                <p className="text-xs text-fem-textMuted">Select your general Body Mass Index classification.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  {['Underweight', 'Normal', 'Overweight', 'Obese'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleChange('bmi', cat)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                        formData.bmi === cat
                          ? 'bg-fem-pink text-white shadow-neu-raised-sm'
                          : 'bg-fem-cream/70 text-fem-text hover:bg-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Menstrual Regularity */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-fem-text">
                  3. Menstrual Regularity <span className="text-fem-pink">*</span>
                </label>
                <p className="text-xs text-fem-textMuted">
                  Are your menstrual cycles generally predictable (21–35 days apart) or irregular/infrequent?
                </p>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  {[
                    { label: 'Regular (21–35 days)', value: 'Regular' },
                    { label: 'Irregular or Infrequent', value: 'Irregular' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleChange('menstrualRegularity', option.value)}
                      className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        formData.menstrualRegularity === option.value
                          ? 'bg-fem-pink text-white shadow-neu-raised-sm'
                          : 'bg-fem-cream/70 text-fem-text hover:bg-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Clinical Signs & Hormonal Markers */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-fem-pinkLight/50 pb-3">
                <h2 className="text-xl font-bold text-fem-text">Section 2: Hormonal & Skin Signs</h2>
                <p className="text-xs text-fem-textMuted mt-1">Symptoms often associated with hyperandrogenism and insulin sensitivity.</p>
              </div>

              {/* 4. Hirsutism */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-fem-text">
                  4. Hirsutism (Excess Hair Growth) <span className="text-fem-pink">*</span>
                </label>
                <p className="text-xs text-fem-textMuted">
                  Excess dark, coarse hair on facial areas (chin, upper lip), chest, lower abdomen, or back.
                </p>
                <div className="flex gap-4 pt-1">
                  {['No', 'Yes'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleChange('hirsutism', val)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                        formData.hirsutism === val
                          ? 'bg-fem-pink text-white shadow-neu-raised-sm'
                          : 'bg-fem-cream/70 text-fem-text hover:bg-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Acne Severity */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-fem-text">
                  5. Acne Severity
                </label>
                <p className="text-xs text-fem-textMuted">
                  Persistent hormonal or cystic breakouts, particularly along the jawline. Select "Not recorded" if not applicable or uncertain.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  {['Mild', 'Moderate', 'Severe', 'Not recorded'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleChange('acneSeverity', level)}
                      className={`py-3 px-3 rounded-xl text-xs font-bold transition-all ${
                        formData.acneSeverity === level
                          ? 'bg-fem-pink text-white shadow-neu-raised-sm'
                          : 'bg-fem-cream/70 text-fem-text hover:bg-white'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Insulin Resistance */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-fem-text">
                  6. Insulin Resistance Signs / Diagnosis <span className="text-fem-pink">*</span>
                </label>
                <p className="text-xs text-fem-textMuted">
                  Diagnosed insulin resistance, pre-diabetes, intense sugar cravings, post-meal fatigue, or acanthosis nigricans (dark velvety skin patches).
                </p>
                <div className="flex gap-4 pt-1">
                  {['No', 'Yes'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleChange('insulinResistance', val)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                        formData.insulinResistance === val
                          ? 'bg-fem-pink text-white shadow-neu-raised-sm'
                          : 'bg-fem-cream/70 text-fem-text hover:bg-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: Lifestyle, History & Stress */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-fem-pinkLight/50 pb-3">
                <h2 className="text-xl font-bold text-fem-text">Section 3: Lifestyle & Family History</h2>
                <p className="text-xs text-fem-textMuted mt-1">Environmental, genetic, and overall wellness indicators.</p>
              </div>

              {/* 7. Family History of PCOS */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-fem-text">
                  7. Family History of PCOS <span className="text-fem-pink">*</span>
                </label>
                <p className="text-xs text-fem-textMuted">
                  Has your mother, sister, or aunt been clinically diagnosed with PCOS?
                </p>
                <div className="flex gap-4 pt-1">
                  {['No', 'Yes'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleChange('familyHistory', val)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                        formData.familyHistory === val
                          ? 'bg-fem-pink text-white shadow-neu-raised-sm'
                          : 'bg-fem-cream/70 text-fem-text hover:bg-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* 8. Lifestyle Score (Slider 1 to 10) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="lifestyle-score" className="text-sm font-bold text-fem-text">
                    8. Lifestyle Score (1–10) <span className="text-fem-pink">*</span>
                  </label>
                  <span className="px-3 py-1 rounded-full bg-fem-pink text-white font-bold text-xs shadow-neu-raised-sm">
                    {formData.lifestyleScore} / 10
                  </span>
                </div>
                <p className="text-xs text-fem-textMuted">
                  Self-assessment of your daily nutrition, sleep, and physical activity habits (1 = Sedentary/High stress, 10 = Highly balanced).
                </p>
                <div className="pt-2 px-1">
                  <input
                    id="lifestyle-score"
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={formData.lifestyleScore}
                    onChange={(e) => handleChange('lifestyleScore', e.target.value)}
                    className="w-full h-2.5 bg-fem-cream rounded-lg appearance-none cursor-pointer neu-inset"
                  />
                  <div className="flex justify-between text-[11px] text-fem-textMuted mt-2">
                    <span>1 (Needs attention)</span>
                    <span>5 (Moderate)</span>
                    <span>10 (Optimal routine)</span>
                  </div>
                </div>
              </div>

              {/* 9. Stress Levels */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-fem-text">
                  9. Chronic Stress Levels <span className="text-fem-pink">*</span>
                </label>
                <p className="text-xs text-fem-textMuted">
                  How would you rate your everyday prolonged emotional or mental stress?
                </p>
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {['Low', 'Medium', 'High'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => handleChange('stressLevels', lvl)}
                      className={`py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        formData.stressLevels === lvl
                          ? 'bg-fem-pink text-white shadow-neu-raised-sm'
                          : 'bg-fem-cream/70 text-fem-text hover:bg-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* 10. Fertility Concerns */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-fem-text">
                  10. Fertility Concerns or Difficulty Conceiving <span className="text-fem-pink">*</span>
                </label>
                <p className="text-xs text-fem-textMuted">
                  Have you experienced fertility challenges or concerns regarding future ovulation?
                </p>
                <div className="flex gap-4 pt-1">
                  {['No', 'Yes'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleChange('fertilityConcerns', val)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                        formData.fertilityConcerns === val
                          ? 'bg-fem-pink text-white shadow-neu-raised-sm'
                          : 'bg-fem-cream/70 text-fem-text hover:bg-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pre-submission Disclaimer */}
              <div className="pt-4">
                <DisclaimerBanner compact={true} />
              </div>

            </div>
          )}

          {/* Error Alert if API failed */}
          {apiError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>Backend Connection Error</span>
              </div>
              <p className="text-xs text-rose-700 leading-relaxed">
                {apiError}
              </p>
            </div>
          )}

          {/* Form Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-fem-pinkLight/40">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="neu-btn-secondary px-6 py-2.5 text-sm font-semibold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="neu-btn-primary px-8 py-3 text-sm font-semibold ml-auto flex items-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`neu-btn-primary px-9 py-3.5 text-base font-bold ml-auto shadow-neu-raised flex items-center gap-2 ${
                  isSubmitting ? 'neu-btn-disabled' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Evaluating Patterns...
                  </>
                ) : (
                  <>
                    Submit Screening
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>

        </form>
      </div>

      {/* Privacy note */}
      <div className="text-center text-xs text-fem-textMuted flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-fem-pink" />
        <span>Your answers are evaluated locally and are not stored in any external database.</span>
      </div>

    </div>
  );
}