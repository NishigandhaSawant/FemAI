
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Apple,
  Activity,
  Moon,
  Smile,
  Stethoscope,
  CheckSquare,
  Square,
  Sparkles,
  Info,
  CalendarCheck,
  Heart,
  Lightbulb,
} from 'lucide-react';

import DisclaimerBanner from '../components/DisclaimerBanner';
import { getRecommendations } from '../services/recommendationService';

export default function WellnessDashboard() {
  const location = useLocation();

  // Assessment answers passed from ResultsPage.
  const formData = location.state?.formData ?? {};
  const hasAssessmentData = Object.keys(formData).length > 0;

  // Generate suggestions from the submitted assessment answers.
  const personalizedRecommendations = getRecommendations(formData);

  // Interactive daily habit checklist.
  const [habits, setHabits] = useState([
    {
      id: 1,
      label: 'Include fiber-rich foods and protein with breakfast',
      completed: false,
      category: 'Nutrition',
    },
    {
      id: 2,
      label: 'Try a comfortable walk or gentle physical activity',
      completed: false,
      category: 'Movement',
    },
    {
      id: 3,
      label: 'Drink water regularly throughout the day',
      completed: false,
      category: 'Hydration',
    },
    {
      id: 4,
      label: 'Spend five minutes on slow breathing or mindfulness',
      completed: false,
      category: 'Stress',
    },
    {
      id: 5,
      label: 'Aim for a consistent sleep schedule',
      completed: false,
      category: 'Sleep',
    },
    {
      id: 6,
      label: 'Record menstrual dates and notable symptoms, if applicable',
      completed: false,
      category: 'Tracking',
    },
  ]);

  const toggleHabit = (id) => {
    setHabits((previousHabits) =>
      previousHabits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  };

  const completedCount = habits.filter(
    (habit) => habit.completed
  ).length;

  const wellnessPillars = [
    {
      title: 'Balanced Nutrition',
      subtitle: 'Everyday nourishment',
      icon: Apple,
      points: [
        {
          heading: 'Build balanced meals:',
          text: 'Combine a variety of vegetables, fiber-rich foods, carbohydrates, protein, and healthy fats according to your needs.',
        },
        {
          heading: 'Choose variety:',
          text: 'Include different fruits, vegetables, legumes, whole grains, nuts, and other foods you enjoy.',
        },
        {
          heading: 'Avoid extreme restrictions:',
          text: 'Avoid unnecessarily restrictive diets. A registered dietitian can help you find a sustainable eating pattern.',
        },
      ],
    },
    {
      title: 'Nourishing Movement',
      subtitle: 'Activity and general health',
      icon: Activity,
      points: [
        {
          heading: 'Find activities you enjoy:',
          text: 'Walking, dancing, cycling, swimming, and strength exercises are possible options.',
        },
        {
          heading: 'Start at your own pace:',
          text: 'Short activity sessions can be a practical starting point. Increase duration or intensity gradually as comfortable.',
        },
        {
          heading: 'Make room for recovery:',
          text: 'Allow rest when needed and adapt activity to your abilities, energy, and any medical advice.',
        },
      ],
    },
    {
      title: 'Healthy Sleep Routine',
      subtitle: 'Rest and recovery',
      icon: Moon,
      points: [
        {
          heading: 'Keep a regular schedule:',
          text: 'Try to maintain consistent bedtimes and wake-up times.',
        },
        {
          heading: 'Create a wind-down routine:',
          text: 'Consider quieter activities and reducing screen use before bedtime if it helps you relax.',
        },
        {
          heading: 'Discuss ongoing sleep issues:',
          text: 'Speak with a healthcare professional if persistent fatigue, loud snoring, or disrupted sleep affects daily life.',
        },
      ],
    },
    {
      title: 'Stress and Emotional Well-being',
      subtitle: 'Everyday coping strategies',
      icon: Smile,
      points: [
        {
          heading: 'Try a calming activity:',
          text: 'Slow breathing, mindfulness, music, or time outdoors may help you unwind.',
        },
        {
          heading: 'Make time for support:',
          text: 'Stay connected with supportive people and set realistic expectations for yourself.',
        },
        {
          heading: 'Seek help when needed:',
          text: 'A qualified mental health professional can help if stress, anxiety, or low mood becomes difficult to manage.',
        },
      ],
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Page header */}
      <header className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-fem-pinkLight/60 text-xs font-semibold text-fem-text">
          <Sparkles className="w-3.5 h-3.5 text-fem-pink" />
          <span>Holistic Health Support</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-fem-text">
          Wellness &amp; Lifestyle Dashboard
        </h1>

        <p className="text-sm text-fem-textMuted max-w-xl mx-auto">
          Explore practical lifestyle ideas for general well-being.
          Your suggestions can be tailored to the answers you provided
          in your FemAI assessment.
        </p>
      </header>

      {/* Medical disclaimer */}
      <div className="p-4 rounded-2xl bg-fem-cream/80 border border-fem-pink/30 flex items-start gap-3 text-xs text-fem-text">
        <Info className="w-5 h-5 text-fem-pink shrink-0 mt-0.5" />

        <p className="leading-relaxed">
          <strong>Important:</strong> These suggestions provide general
          wellness information. They cannot diagnose, prevent, or cure
          PCOS and do not replace professional medical advice. Discuss
          symptoms, treatment, and supplements with a qualified
          healthcare professional.
        </p>
      </div>

      {/* Personalized recommendations */}
      <section className="space-y-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Heart className="w-5 h-5 text-fem-pink" />

            <h2 className="text-2xl font-bold text-fem-text">
              Your Wellness Suggestions
            </h2>
          </div>

          <p className="text-sm text-fem-textMuted">
            {hasAssessmentData
              ? 'These suggestions are selected using your assessment responses.'
              : 'Here are some general wellness suggestions. Complete an assessment to see suggestions selected from your answers.'}
          </p>
        </div>

        {personalizedRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalizedRecommendations.map((item) => (
              <article
                key={item.id}
                className="neu-card p-6 space-y-4 bg-white/70"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-fem-pinkLight/60 px-3 py-1 text-xs font-semibold text-fem-text">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-fem-text">
                  {item.title}
                </h3>

                <p className="text-sm text-fem-textMuted leading-relaxed">
                  {item.description}
                </p>

                <div className="p-4 rounded-xl bg-fem-cream/70 space-y-1">
                  <p className="text-xs font-bold text-fem-text flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-fem-pink" />
                    A small step to try
                  </p>

                  <p className="text-sm text-fem-text leading-relaxed">
                    {item.habit}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="neu-card p-6 bg-white/70 text-sm text-fem-textMuted">
            No specific suggestions matched your responses. You can
            explore the general wellness guidance below.
          </div>
        )}

        <p className="text-xs text-fem-textMuted">
          These suggestions are informational, not a clinical risk
          assessment. The presence or absence of a suggestion does not
          indicate whether you have PCOS.
        </p>
      </section>

      {/* Daily habit tracker */}
      <section className="neu-card p-6 sm:p-8 bg-[#FFF9F7] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-fem-pinkLight/50 pb-4">
          <div>
            <h2 className="text-xl font-bold text-fem-text flex items-center">
              <CalendarCheck className="w-5 h-5 text-fem-pink mr-2" />
              Daily Wellness Habits
            </h2>

            <p className="text-xs text-fem-textMuted mt-1">
              Select the habits you complete. Choose realistic goals
              that work for you.
            </p>
          </div>

          <div className="px-4 py-2 rounded-full bg-white/80 shadow-neu-raised-sm text-xs font-bold text-fem-text self-start sm:self-auto">
            {completedCount} of {habits.length} completed
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-2 rounded-full bg-fem-pinkLight/50 overflow-hidden"
          role="progressbar"
          aria-label="Daily habit completion"
          aria-valuemin={0}
          aria-valuemax={habits.length}
          aria-valuenow={completedCount}
        >
          <div
            className="h-full rounded-full bg-fem-pink transition-all duration-300"
            style={{
              width: `${(completedCount / habits.length) * 100}%`,
            }}
          />
        </div>

        <div className="space-y-3">
          {habits.map((habit) => (
            <button
              key={habit.id}
              type="button"
              onClick={() => toggleHabit(habit.id)}
              aria-pressed={habit.completed}
              className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center gap-3.5 select-none ${
                habit.completed
                  ? 'bg-fem-pinkSoft/80 shadow-neu-inset text-fem-textMuted'
                  : 'bg-white/70 shadow-neu-raised-sm hover:bg-white text-fem-text'
              }`}
            >
              <span className="text-fem-pink shrink-0">
                {habit.completed ? (
                  <CheckSquare className="w-5 h-5" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </span>

              <span
                className={`text-xs sm:text-sm font-medium flex-1 ${
                  habit.completed ? 'line-through opacity-70' : ''
                }`}
              >
                {habit.label}
              </span>

              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md bg-fem-cream text-fem-textMuted shrink-0">
                {habit.category}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* General wellness pillars */}
      <section className="space-y-6">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-fem-text">
            Core Wellness Guidance
          </h2>

          <p className="text-sm text-fem-textMuted">
            General information for everyday health, alongside your
            personalized suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wellnessPillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                className="neu-card p-6 space-y-4 bg-white/70"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-fem-cream flex items-center justify-center text-fem-pink shadow-neu-inset">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-fem-text">
                      {pillar.title}
                    </h3>

                    <span className="text-xs text-fem-textMuted">
                      {pillar.subtitle}
                    </span>
                  </div>
                </div>

                <ul className="text-xs text-fem-text space-y-3 leading-relaxed">
                  {pillar.points.map((point) => (
                    <li
                      key={point.heading}
                      className="flex items-start gap-2"
                    >
                      <span className="text-fem-pink font-bold">•</span>

                      <span>
                        <strong>{point.heading}</strong>{' '}
                        {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      {/* When to seek professional care */}
      <section className="neu-card p-8 bg-gradient-to-r from-fem-cream to-[#FFF5F0] space-y-4">
        <div className="flex items-center gap-3">
          <Stethoscope className="w-6 h-6 text-fem-pink shrink-0" />

          <h2 className="text-lg font-bold text-fem-text">
            When to Seek Professional Medical Care
          </h2>
        </div>

        <p className="text-xs text-fem-textMuted leading-relaxed">
          Consider speaking with a qualified healthcare professional
          if you have concerns about:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-fem-text">
          <div className="p-3 rounded-xl bg-white/80 shadow-neu-raised-sm">
            Menstrual cycles that are persistently irregular or absent.
          </div>

          <div className="p-3 rounded-xl bg-white/80 shadow-neu-raised-sm">
            New, persistent, or rapidly developing excess hair growth,
            severe acne, or other physical changes.
          </div>

          <div className="p-3 rounded-xl bg-white/80 shadow-neu-raised-sm">
            Fertility, ovulation, or reproductive health questions.
          </div>

          <div className="p-3 rounded-xl bg-white/80 shadow-neu-raised-sm">
            Severe pelvic pain, unusually heavy bleeding, or significant
            changes in emotional well-being.
          </div>
        </div>

        <p className="text-xs text-fem-textMuted leading-relaxed">
          Seek urgent medical attention for severe or sudden symptoms.
          Do not wait for a FemAI assessment result if you need care.
        </p>
      </section>

      {/* Footer disclaimer */}
      <DisclaimerBanner />
    </main>
  );
}
