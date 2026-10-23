import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  HeartPulse,
  AlertCircle,
  CheckCircle,
  Info,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Apple,
  ClipboardCheck,
} from 'lucide-react';
import DisclaimerBanner from '../components/DisclaimerBanner';

export default function ResultsPage() {
  const location = useLocation();
  const [showAnswers, setShowAnswers] = useState(false);

  // Results and answers are passed from AssessmentPage after submission.
  const result = location.state?.result;
  const formData = location.state?.formData;

  // Handle users who open this page without completing an assessment.
  if (!result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-fem-pinkLight/60 flex items-center justify-center text-fem-pink shadow-neu-raised-sm">
          <Info className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-fem-text">No Assessment Found</h2>
        <p className="text-sm text-fem-textMuted max-w-md mx-auto">
          You haven't completed the questionnaire yet. Complete the assessment to view your summary and suggested next steps.
        </p>
        <Link to="/assessment" className="neu-btn-primary inline-flex px-8 py-3 text-sm font-semibold">
          Start Assessment
        </Link>
      </div>
    );
  }

  // Accept only the expected backend labels; avoid silently treating unknown values as negative.
  const prediction = String(result.prediction ?? '').trim().toLowerCase();
  const isPositive = prediction === 'positive';
  const isNegative = prediction === 'negative';
  const hasRecognizedPrediction = isPositive || isNegative;

  const answerRows = formData
    ? [
        ['Age', formData.age != null ? `${formData.age} years` : 'Not provided'],
        ['BMI category', formData.bmi],
        ['Menstrual regularity', formData.menstrualRegularity],
        ['Hirsutism', formData.hirsutism],
        ['Acne severity', formData.acneSeverity],
        ['Family history', formData.familyHistory],
        ['Insulin resistance', formData.insulinResistance],
        ['Lifestyle score', formData.lifestyleScore != null ? `${formData.lifestyleScore} / 10` : 'Not provided'],
        ['Stress levels', formData.stressLevels],
        ['Fertility concerns', formData.fertilityConcerns],
      ]
    : [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Friendly, non-technical heading */}
      <header className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fem-cream text-xs font-bold text-fem-text shadow-neu-raised-sm">
          <HeartPulse className="w-4 h-4 text-fem-pink" />
          Assessment Completed
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-fem-text">
          Your Assessment Results
        </h1>
        <p className="text-sm text-fem-textMuted max-w-xl mx-auto">
          A starting point for understanding your health and deciding what to do next.
        </p>
      </header>

      {/* Result card */}
      <section className="neu-card p-6 sm:p-9 space-y-6 bg-white/80" aria-live="polite">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-fem-cream text-fem-pink shadow-neu-raised-sm">
            {hasRecognizedPrediction ? (
              isPositive ? <AlertCircle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />
            ) : (
              <Info className="w-8 h-8" />
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-fem-text">
            {!hasRecognizedPrediction
              ? 'Your result is unavailable'
              : isPositive
                ? 'Some indicators may need further attention'
                : 'Fewer indicators were identified'}
          </h2>
          <p className="text-sm text-fem-textMuted max-w-xl mx-auto leading-relaxed">
            {!hasRecognizedPrediction
              ? 'We could not understand the result returned for this assessment. Please try again or contact the project team.'
              : isPositive
                ? 'Your responses match some patterns in the screening data. If you have symptoms or concerns, consider discussing them with a qualified healthcare professional.'
                : 'The screening model identified fewer matching indicators in your responses. This result does not rule out PCOS, especially if you have symptoms or ongoing concerns.'}
          </p>
        </div>

        <div className="rounded-2xl bg-fem-cream/70 border border-fem-pink/30 p-4 sm:p-5 space-y-2">
          <h3 className="text-sm font-bold text-fem-text flex items-center gap-2">
            <Info className="w-4 h-4 text-fem-pink shrink-0" />
            Please keep in mind
          </h3>
          <p className="text-sm text-fem-text leading-relaxed">
            FemAI provides an experimental screening result for awareness only. It cannot diagnose PCOS or confirm that you do not have it. A healthcare professional can assess your symptoms and decide whether any examination or tests are appropriate.
          </p>
        </div>
      </section>

      {/* Review submitted answers */}
      {formData && (
        <section className="neu-card p-5 sm:p-6 bg-[#FFF9F7]">
          <button
            type="button"
            onClick={() => setShowAnswers((previous) => !previous)}
            className="w-full flex items-center justify-between gap-3 text-left font-bold text-sm text-fem-text"
            aria-expanded={showAnswers}
          >
            <span className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-fem-pink" />
              Review your submitted answers
            </span>
            {showAnswers ? (
              <ChevronUp className="w-5 h-5 text-fem-textMuted" />
            ) : (
              <ChevronDown className="w-5 h-5 text-fem-textMuted" />
            )}
          </button>

          {showAnswers && (
            <dl className="mt-4 pt-4 border-t border-fem-pinkLight/50 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {answerRows.map(([label, value]) => (
                <div key={label} className="p-3 rounded-xl bg-fem-cream/50 flex items-start justify-between gap-3">
                  <dt className="text-fem-textMuted">{label}:</dt>
                  <dd className="font-semibold text-fem-text text-right">{value || 'Not provided'}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      )}

      {/* Helpful next steps */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <article className="neu-card p-6 space-y-3 bg-white/70">
          <div className="w-10 h-10 rounded-full bg-fem-pinkLight/60 flex items-center justify-center text-fem-pink">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-fem-text">Talk to a healthcare professional</h3>
          <p className="text-sm text-fem-textMuted leading-relaxed">
            If you experience irregular periods or other symptoms that concern you, a qualified healthcare professional can help you understand possible causes and discuss appropriate next steps.
          </p>
        </article>

        <article className="neu-card p-6 space-y-3 bg-white/70">
          <div className="w-10 h-10 rounded-full bg-fem-pinkLight/60 flex items-center justify-center text-fem-pink">
            <Apple className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-fem-text">Take care of your well-being</h3>
          <p className="text-sm text-fem-textMuted leading-relaxed">
            Regular movement, balanced meals, sufficient sleep, and stress-management habits can support general well-being. Choose changes that feel safe and sustainable for you.
          </p>
          <Link
            to="/wellness"
            className="text-sm font-bold text-fem-pink hover:text-fem-pinkHover inline-flex items-center gap-1"
          >
            Explore wellness guidance <ArrowRight className="w-4 h-4" />
          </Link>
        </article>
      </section>

      {/* Actions */}
      <nav className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2" aria-label="Assessment actions">
        <Link
          to="/assessment"
          className="neu-btn-secondary px-6 py-3 text-sm font-semibold w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Retake assessment
        </Link>
        <Link
          to="/wellness" state={{ formData }}
          className="neu-btn-primary px-7 py-3 text-sm font-semibold w-full sm:w-auto flex items-center justify-center gap-2"
        >
          Continue to wellness guide <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      <DisclaimerBanner />
    </div>
  );
}
