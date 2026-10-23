import React from 'react';
import { 
  Sparkles, 
  Database, 
  Cpu, 
  BarChart3, 
  AlertTriangle, 
  Layers
} from 'lucide-react';
import DisclaimerBanner from '../components/DisclaimerBanner';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fem-pinkLight/60 text-xs font-semibold text-fem-text">
          <Cpu className="w-3.5 h-3.5 text-fem-pink" />
          <span>Transparent Machine Learning</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-fem-text">
          About FemAI & Methodology
        </h1>
        <p className="text-sm text-fem-textMuted max-w-xl mx-auto">
          An open, educational end-to-end machine learning prototype demonstrating responsible AI principles, data preprocessing, and model limitations in women's health.
        </p>
      </div>

      {/* 1. What is FemAI */}
      <div className="neu-card p-6 sm:p-8 space-y-4 bg-white/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-fem-cream flex items-center justify-center text-fem-pink shadow-neu-inset">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-fem-text">Project Objective</h2>
        </div>
        <p className="text-xs sm:text-sm text-fem-textMuted leading-relaxed">
          FemAI was built to explore how statistical machine learning can raise awareness around Polycystic Ovary Syndrome (PCOS). Rather than functioning as a black-box medical claims system, FemAI is designed to be an accessible, educational tool that emphasizes transparent model evaluation, data humility, and non-prescriptive lifestyle guidance.
        </p>
      </div>

      {/* 2. Dataset Origin & Integrity */}
      <div className="neu-card p-6 sm:p-8 space-y-5 bg-white/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-fem-cream flex items-center justify-center text-fem-pink shadow-neu-inset">
            <Database className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-fem-text">Research Dataset Overview</h2>
        </div>
        <p className="text-xs sm:text-sm text-fem-textMuted leading-relaxed">
          The prototype is trained on the open-source Kaggle Polycystic Ovary Syndrome research snapshot containing <strong>124,958 patient records</strong>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-fem-cream/60 shadow-neu-raised-sm">
            <div className="text-2xl font-black text-fem-text">124,958</div>
            <div className="text-[11px] text-fem-textMuted mt-1">Total Records</div>
          </div>
          <div className="p-4 rounded-2xl bg-fem-cream/60 shadow-neu-raised-sm">
            <div className="text-2xl font-black text-fem-text">10</div>
            <div className="text-[11px] text-fem-textMuted mt-1">Input Features</div>
          </div>
          <div className="p-4 rounded-2xl bg-fem-cream/60 shadow-neu-raised-sm">
            <div className="text-2xl font-black text-fem-text">87.9%</div>
            <div className="text-[11px] text-fem-textMuted mt-1">Class 0 (No)</div>
          </div>
          <div className="p-4 rounded-2xl bg-fem-cream/60 shadow-neu-raised-sm">
            <div className="text-2xl font-black text-fem-text">12.1%</div>
            <div className="text-[11px] text-fem-textMuted mt-1">Class 1 (Yes)</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
          <strong>Data Leakage Prevention:</strong> Columns such as <em>Undiagnosed PCOS Likelihood</em> were deliberately excluded from model training to prevent target leakage, as synthetic score generators could artificially inflate classifier accuracy without clinical validity.
        </div>
      </div>

      {/* 3. Preprocessing & ML Architecture */}
      <div className="neu-card p-6 sm:p-8 space-y-5 bg-white/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-fem-cream flex items-center justify-center text-fem-pink shadow-neu-inset">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-fem-text">Scikit-Learn Pipeline Architecture</h2>
        </div>
        
        <p className="text-xs sm:text-sm text-fem-textMuted leading-relaxed">
          The backend leverages an integrated Scikit-learn Pipeline with strict preprocessing encapsulation:
        </p>

        <div className="space-y-3 text-xs text-fem-text">
          <div className="p-3.5 rounded-xl bg-fem-cream/50">
            <strong>1. Numerical Pipeline:</strong> Standardizes <code>Age</code> and <code>Lifestyle Score</code> using median imputation (<code>SimpleImputer(strategy='median')</code>) followed by z-score standardization (<code>StandardScaler</code>).
          </div>
          <div className="p-3.5 rounded-xl bg-fem-cream/50">
            <strong>2. Categorical Pipeline:</strong> Fills missing acne records with <code>"Not recorded"</code>, then applies <code>OneHotEncoder(handle_unknown='ignore')</code> across 8 categorical variables.
          </div>
          <div className="p-3.5 rounded-xl bg-fem-cream/50">
            <strong>3. Linear Support Vector Classifier:</strong> Employs <code>LinearSVC(class_weight='balanced', max_iter=3000, random_state=42)</code> to account for severe class imbalance (88:12 ratio).
          </div>
        </div>
      </div>

      {/* 4. Model Limitations & True Metrics */}
      <div className="neu-card p-6 sm:p-8 space-y-5 bg-[#FFF9F7]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-fem-cream flex items-center justify-center text-fem-pink shadow-neu-inset">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-fem-text">Verified Evaluation Metrics & Limitations</h2>
        </div>

        <p className="text-xs sm:text-sm text-fem-textMuted leading-relaxed">
          Below are the real test set performance metrics evaluated on <strong>24,992 unseen records</strong> (20% stratified test split). We explicitly do not fabricate or inflate model performance:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white shadow-neu-raised-sm">
            <div className="text-2xl font-black text-fem-text">58.1%</div>
            <div className="text-xs font-bold text-fem-textMuted mt-1">Accuracy</div>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-neu-raised-sm">
            <div className="text-2xl font-black text-fem-text">14.1%</div>
            <div className="text-xs font-bold text-fem-textMuted mt-1">Precision</div>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-neu-raised-sm">
            <div className="text-2xl font-black text-fem-text">48.3%</div>
            <div className="text-xs font-bold text-fem-textMuted mt-1">Recall</div>
          </div>
          <div className="p-4 rounded-2xl bg-white shadow-neu-raised-sm">
            <div className="text-2xl font-black text-fem-text">0.218</div>
            <div className="text-xs font-bold text-fem-textMuted mt-1">F1-Score</div>
          </div>
        </div>

        {/* Critical Limitation Takeaway */}
        <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/60 space-y-2 text-xs text-rose-900 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-rose-800">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Why These Metrics Matter</span>
          </div>
          <p>
            A precision of 14.1% reveals that <strong>the model produces substantial false positives</strong>—many individuals without PCOS may receive an experimental positive flag. Conversely, a recall of 48.3% indicates that roughly half of true cases would be missed by this tabular model alone.
          </p>
          <p className="font-semibold text-rose-950">
            Consequently, FemAI should NEVER be used as a standalone diagnostic tool. Clinical diagnosis requires pelvic ultrasounds and hormonal bloodwork interpreted by a licensed physician.
          </p>
        </div>
      </div>

      {/* Disclaimers */}
      <DisclaimerBanner />

    </div>
  );
}