import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldAlert, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-fem-cream/60 border-t border-fem-pinkLight/60 mt-16 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-fem-pink flex items-center justify-center text-white">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <span className="text-xl font-bold text-fem-text">FemAI</span>
          </div>
          <p className="text-sm text-fem-textMuted max-w-md leading-relaxed">
            A machine-learning-assisted PCOS risk awareness and lifestyle guidance prototype designed to educate, empower, and encourage timely clinical conversations.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-fem-text">Platform</h4>
          <ul className="space-y-2 text-sm text-fem-textMuted">
            <li><Link to="/" className="hover:text-fem-pink transition-colors">Home</Link></li>
            <li><Link to="/assessment" className="hover:text-fem-pink transition-colors">PCOS Questionnaire</Link></li>
            <li><Link to="/wellness" className="hover:text-fem-pink transition-colors">Wellness Dashboard</Link></li>
            <li><Link to="/about" className="hover:text-fem-pink transition-colors">About & ML Methodology</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-fem-text">Resources</h4>
          <ul className="space-y-2 text-sm text-fem-textMuted">
            <li>
              <a 
                href="https://www.kaggle.com/datasets/anniemeena/polycystic-ovary-syndrome" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-fem-pink transition-colors"
              >
                Kaggle Dataset
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </li>
            <li>
              <a 
                href="https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 hover:text-fem-pink transition-colors"
              >
                WHO PCOS Fact Sheet
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Disclaimers & Copyright */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-fem-pinkLight/40 flex flex-col md:flex-row items-center justify-between text-xs text-fem-textMuted gap-4">
        <div className="flex items-center gap-2 text-center md:text-left">
          <ShieldAlert className="w-4 h-4 text-fem-pink shrink-0" />
          <span>
            <strong>Disclaimer:</strong> FemAI is an experimental prototype and does not provide medical diagnoses or replace clinical care.
          </span>
        </div>
        <div className="shrink-0">
          &copy; {new Date().getFullYear()} FemAI
        </div>
      </div>
    </footer>
  );
}