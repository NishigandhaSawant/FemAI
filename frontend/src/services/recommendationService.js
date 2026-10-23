const recommendations = {
  stress: {
    id: "stress",
    category: "Stress Management",
    title: "Prioritize Cortisol & Stress Reduction",
    description:
      "High chronic stress elevates cortisol, which can worsen insulin resistance and androgen production.",
    habit: "Practice 5-10 minutes of somatic breathing or meditation daily."
  },

  sleep: {
    id: "sleep",
    category: "Sleep Hygiene",
    title: "Optimize Circadian Rhythm & Sleep",
    description:
      "Restorative sleep helps regulate hunger hormones (leptin and ghrelin) and improves insulin sensitivity.",
    habit: "Maintain a consistent bedtime and limit blue light 60 minutes before sleep."
  },

  cycle: {
    id: "cycle",
    category: "Menstrual & Ovulatory Care",
    title: "Track Cycle Variations",
    description:
      "Monitoring cycle length and symptoms helps identify anovulatory patterns for discussions with your physician.",
    habit: "Log cycle start dates and any associated physical symptoms."
  },

  movement: {
    id: "movement",
    category: "Physical Activity",
    title: "Low-Impact & Resistance Training",
    description:
      "Regular movement improves muscle glucose uptake. Balance strength training with low-impact cardio to avoid excess cortisol spike.",
    habit: "Aim for a 15-minute brisk walk after meals or 2-3 gentle strength sessions per week."
  },

  nutrition: {
    id: "nutrition",
    category: "Metabolic Nutrition",
    title: "Blood Sugar Balancing Meals",
    description:
      "Pairing complex carbohydrates with protein and healthy fats minimizes glucose spikes and insulin surges.",
    habit: "Include a source of protein and fiber with every meal."
  },

  insulin: {
    id: "insulin",
    category: "Insulin Sensitivity",
    title: "Manage Glucose & Craving Triggers",
    description:
      "Addressing post-meal fatigue and sugar cravings through dietary timing and fiber intake supports metabolic energy.",
    habit: "Eat a savory, protein-focused breakfast to stabilize morning blood sugar."
  },

  skin_hair: {
    id: "skin_hair",
    category: "Androgen Support",
    title: "Gentle Skin & Anti-Inflammatory Habits",
    description:
      "Persistent acne or excess hair growth are often linked to elevated androgen sensitivity and systemic inflammation.",
    habit: "Focus on anti-inflammatory whole foods and a consistent skin barrier routine."
  },

  fertility: {
    id: "fertility",
    category: "Preconception & Ovulation",
    title: "Support Ovulatory Health",
    description:
      "Inconsistent ovulation is a primary factor in PCOS fertility concerns. Focus on nutrient density and early medical alignment.",
    habit: "Track signs of ovulation (such as cervical mucus or BBT) and consult a reproductive specialist."
  }
};

export function getRecommendations(assessment = {}) {
  const result = [];
  const add = (item) => {
    if (!result.some((r) => r.id === item.id)) {
      result.push(item);
    }
  };

  // 1. High Stress Level
  if (assessment.stressLevels === "High") {
    add(recommendations.stress);
  }

  // 2. Irregular Menstrual Cycle
  if (assessment.menstrualRegularity === "Irregular") {
    add(recommendations.cycle);
  }

  // 3. Insulin Resistance Signs or Diagnosis
  if (assessment.insulinResistance === "Yes") {
    add(recommendations.insulin);
    add(recommendations.nutrition);
  }

  // 4. Androgen Indicators (Hirsutism or Moderate/Severe Acne)
  if (
    assessment.hirsutism === "Yes" ||
    assessment.acneSeverity === "Moderate" ||
    assessment.acneSeverity === "Severe"
  ) {
    add(recommendations.skin_hair);
  }

  // 5. Fertility Concerns
  if (assessment.fertilityConcerns === "Yes") {
    add(recommendations.fertility);
    add(recommendations.cycle);
  }

  // 6. Low Self-Reported Lifestyle Score (<= 5 out of 10)
  if (assessment.lifestyleScore && Number(assessment.lifestyleScore) <= 5) {
    add(recommendations.movement);
    add(recommendations.sleep);
    add(recommendations.nutrition);
  }

  // Fallback defaults when minimal or no specific risk factors match
  if (result.length === 0) {
    add(recommendations.nutrition);
    add(recommendations.movement);
    add(recommendations.sleep);
  }

  return result;
}