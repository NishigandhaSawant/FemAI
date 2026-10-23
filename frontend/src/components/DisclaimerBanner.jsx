import React from 'react';
import { ShieldAlert, AlertCircle } from 'lucide-react';

export default function DisclaimerBanner({ compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Important:</strong> FemAI is an educational prototype and does not provide medical diagnoses.
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="text-xs leading-relaxed">
        <h4 className="font-bold text-sm mb-1">Medical Disclaimer</h4>
        <p>
          FemAI is for educational screening only. It does not provide medical diagnoses or replace clinical evaluations and laboratory testing by qualified healthcare professionals.
        </p>
      </div>
    </div>
  );
}