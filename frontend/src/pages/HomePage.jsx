import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  Heart, 
  Apple, 
  Moon, 
  Smile 
} from 'lucide-react';
import DisclaimerBanner from '../components/DisclaimerBanner';

export default function HomePage() {
  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fem-pinkLight/60 shadow-neu-raised-sm border border-white/60">
            <Sparkles className="w-4 h-4 text-fem-pink" />
            <span className="text-xs font-semibold tracking-wide text-fem-text">
              PCOS Risk Awareness & Lifestyle Guidance
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fem-text tracking-tight leading-tight">
            Understand Your Body.{' '}
            <span className="text-fem-pink underline decoration-fem-pinkLight/80 decoration-wavy decoration-2">
              Take Charge
            </span>{' '}
            of Your Health.
          </h1>

          <p className="text-base sm:text-lg text-fem-textMuted max-w-2xl mx-auto leading-relaxed">
            Polycystic Ovary Syndrome (PCOS) affects an estimated 1 in 10 women of reproductive age, yet up to 70% remain undiagnosed. FemAI explores patterns in your reported symptoms to foster proactive, informed health discussions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/assessment"
              className="neu-btn-primary px-8 py-3.5 text-base font-semibold w-full sm:w-auto shadow-neu-raised flex items-center justify-center gap-2"
            >
              Start Your Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/about"
              className="neu-btn-secondary px-8 py-3.5 text-base font-semibold w-full sm:w-auto text-center"
            >
              Explore How It Works
            </Link>
          </div>

          {/* Quick trust badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-fem-textMuted">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-fem-pink" />
              <span>10 Clinical & Lifestyle Markers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-fem-pink" />
              <span>Private & Client-Side Secure</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-fem-pink" />
              <span>Evidence-Informed Wellness</span>
            </div>
          </div>

        </div>
      </section>

      {/* How FemAI Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-fem-text">How FemAI Works</h2>
          <p className="text-sm text-fem-textMuted mt-2">
            A simple 3-step screening workflow to help you reflect on physical markers and daily habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="neu-card p-8 text-center space-y-4 relative">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-fem-cream flex items-center justify-center shadow-neu-inset text-fem-pink font-extrabold text-xl">
              01
            </div>
            <h3 className="text-lg font-bold text-fem-text">Share Your Symptoms</h3>
            <p className="text-sm text-fem-textMuted leading-relaxed">
              Complete a 2-minute questionnaire covering menstrual regularity, skin and hair health, BMI category, and stress patterns.
            </p>
          </div>

          {/* Step 2 */}
          <div className="neu-card p-8 text-center space-y-4 relative">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-fem-cream flex items-center justify-center shadow-neu-inset text-fem-pink font-extrabold text-xl">
              02
            </div>
            <h3 className="text-lg font-bold text-fem-text">ML Pattern Screening</h3>
            <p className="text-sm text-fem-textMuted leading-relaxed">
              Our trained Linear SVM model evaluates how your symptom profile compares against over 124,000 anonymized research records.
            </p>
          </div>

          {/* Step 3 */}
          <div className="neu-card p-8 text-center space-y-4 relative">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-fem-cream flex items-center justify-center shadow-neu-inset text-fem-pink font-extrabold text-xl">
              03
            </div>
            <h3 className="text-lg font-bold text-fem-text">Holistic Lifestyle Guidance</h3>
            <p className="text-sm text-fem-textMuted leading-relaxed">
              Receive balanced lifestyle recommendations—spanning nutrition, exercise, and sleep—plus actionable tips for speaking with a doctor.
            </p>
          </div>

        </div>
      </section>

      {/* What is PCOS Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="neu-card p-8 sm:p-12 bg-gradient-to-br from-[#FFF9F7] to-[#FFF1E6]/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-5">
              <span className="text-xs font-bold tracking-wider uppercase text-fem-pink">
                Educational Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-fem-text">
                What is Polycystic Ovary Syndrome?
              </h2>
              <p className="text-sm text-fem-textMuted leading-relaxed">
                PCOS is a common endocrine and metabolic condition characterized by hormonal imbalances. It often involves elevated androgens (male hormones), irregular or absent menstrual cycles, and small follicles in the ovaries.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-fem-pink mt-2 shrink-0" />
                  <p className="text-sm text-fem-text">
                    <strong>Ovulatory Disruption:</strong> Irregular, delayed, or missed periods.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-fem-pink mt-2 shrink-0" />
                  <p className="text-sm text-fem-text">
                    <strong>Hyperandrogenism:</strong> Hirsutism (excess facial/body hair), persistent cystic acne, or thinning scalp hair.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-fem-pink mt-2 shrink-0" />
                  <p className="text-sm text-fem-text">
                    <strong>Metabolic Factors:</strong> Insulin resistance, fatigue, and difficulty maintaining metabolic balance.
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  to="/wellness"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-fem-pink hover:text-fem-pinkHover transition-colors"
                >
                  Explore evidence-based lifestyle tips
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Neuromorphic Card Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="neu-card p-5 space-y-2 text-center bg-white/70">
                <Apple className="w-7 h-7 text-fem-pink mx-auto" />
                <h4 className="text-sm font-bold text-fem-text">Nutrition</h4>
                <p className="text-xs text-fem-textMuted">Low-glycemic & blood-sugar balancing foods</p>
              </div>
              <div className="neu-card p-5 space-y-2 text-center bg-white/70">
                <Activity className="w-7 h-7 text-fem-pink mx-auto" />
                <h4 className="text-sm font-bold text-fem-text">Movement</h4>
                <p className="text-xs text-fem-textMuted">Strength training & low-impact aerobic walking</p>
              </div>
              <div className="neu-card p-5 space-y-2 text-center bg-white/70">
                <Moon className="w-7 h-7 text-fem-pink mx-auto" />
                <h4 className="text-sm font-bold text-fem-text">Sleep Hygiene</h4>
                <p className="text-xs text-fem-textMuted">Circadian rhythm consistency for hormone repair</p>
              </div>
              <div className="neu-card p-5 space-y-2 text-center bg-white/70">
                <Smile className="w-7 h-7 text-fem-pink mx-auto" />
                <h4 className="text-sm font-bold text-fem-text">Stress Relief</h4>
                <p className="text-xs text-fem-textMuted">Cortisol regulation & somatic mindfulness</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Responsible Use Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclaimerBanner />
      </section>

    </div>
  );
}