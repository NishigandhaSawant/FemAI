import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import WellnessDashboard from './pages/WellnessDashboard';
import AboutPage from './pages/AboutPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container bg-fem-bg min-h-screen flex flex-col font-sans selection:bg-fem-pinkLight selection:text-fem-text">
        <Navbar />
        <main className="main-content flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/wellness" element={<WellnessDashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
