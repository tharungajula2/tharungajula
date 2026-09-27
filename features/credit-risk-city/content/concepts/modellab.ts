import type { Concept } from '../types';

// District 8 · Model Lab — models, statistics and validation.
export const modellab: Concept[] = [
  {
    id: 'scorecard', district: 'modellab', layer: 'F', verified: false, anchor: 'lab-machine', prerequisites: ['pd'], links: ['credit-decision'],
    name: 'Scorecards',
    oneLiner: 'A scorecard turns borrower characteristics into points, and points into a risk ranking.',
    explanation:
      'Each characteristic (age band, income band, past delinquency) earns points; the total is the score. Higher scores mean lower odds of default.\n\nApplication scorecards decide new loans; behavioural scorecards re-score existing customers from their account behaviour. A cut-off turns the score into approve or decline.',
    whyItMatters: 'Scorecard variables, bands and cut-offs are exactly what BAs specify in decision engines.',
  },
  {
    id: 'discrimination-calibration', district: 'modellab', layer: 'F', verified: false, anchor: 'lab-roc', prerequisites: ['pd'], links: ['gini-auc'],
    name: 'Discrimination vs calibration',
    oneLiner: 'Ranking risk well is different from predicting the right level of risk.',
    explanation:
      'Discrimination: does the model put bad borrowers above good ones? (Gini, AUC)\nCalibration: do predicted PDs match observed default rates? (back-testing by grade)\n\nA model can rank perfectly and still predict 1% where 4% default.',
    whyItMatters: 'Validation findings usually come down to one of these two, and the fixes are different.',
  },
  {
    id: 'gini-auc', district: 'modellab', layer: 'F', verified: false, anchor: 'lab-curve', prerequisites: ['discrimination-calibration'], links: [],
    name: 'AUC and Gini',
    oneLiner: 'AUC is the chance the model ranks a random defaulter above a random non-defaulter; Gini = 2 × AUC − 1.',
    explanation:
      'AUC 0.5 is a coin toss; 1.0 is perfect ranking. Gini rescales it so 0 is random and 1 is perfect.\n\nBoth measure ranking only — they say nothing about whether the PD levels are right.',
    whyItMatters: 'Monitoring packs report Gini every period; a falling Gini is an early sign a model is decaying.',
    misconception: '“Gini 0.6 means 60% of defaults are predicted.” It is a ranking measure, not a hit rate.',
  },
  {
    id: 'model-validation', district: 'modellab', layer: 'F', verified: false, anchor: 'lab-magnifier', prerequisites: ['discrimination-calibration'], links: ['three-lines'],
    name: 'Model validation and model risk',
    oneLiner: 'An independent team challenges every model before use and keeps checking it after.',
    explanation:
      'Three parts: conceptual soundness (data, method, assumptions), outcomes analysis (back-testing predictions against what happened), and ongoing monitoring (stability and performance over time).\n\nValidators must be independent of the developers. Findings, limitations and overlays are tracked in a model inventory.',
    whyItMatters: 'Model changes need documented requirements, test evidence and validation sign-off — all BA artefacts.',
    embassy: { US: 'US supervisory model-risk guidance: SR 11-7, replaced in 2026 by SR 26-2.' },
  },
  {
    id: 'population-stability', district: 'modellab', layer: 'F', verified: false, anchor: 'lab-thermometer', prerequisites: ['scorecard'], links: ['model-validation'],
    name: 'Population stability (PSI)',
    oneLiner: 'Has the population being scored drifted away from the one the model was built on?',
    explanation:
      'PSI = Σ (actual% − expected%) × ln(actual% ÷ expected%) across score bands.\n\nA common rule of thumb: below 0.10 stable, 0.10–0.25 some shift, above 0.25 a significant shift that needs investigation.',
    whyItMatters: 'PSI is a standard monitoring metric; its bands and thresholds are specified in monitoring requirements.',
  },
];
