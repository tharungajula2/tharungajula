import React from "react";
import { MasterclassHero, MasterFlow, TruthBoundary } from "@/components/masterclass";

export const metadata = {
  title: "Bank Customer Churn Masterclass | Portfolio Learning OS",
  description: "Binary classification and neural network architecture for imbalanced bank customer churn prediction.",
};

export default function ChurnPage() {
  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-8 text-ink font-sans space-y-10 pb-28 sm:pb-32">
      <MasterclassHero
        kicker="PORTFOLIO MASTERCLASS · APPLIED ML"
        title="Bank Customer Churn"
        titleItalic="& Neural Networks"
        objective="How do we identify likely churners when the positive class is relatively rare (20.37% baseline churn rate)?"
        tags={["Binary Classification", "Neural Networks", "SMOTE Sampling", "Confusion Matrix Trade-offs"]}
        numbers={[
          { value: "10,000", label: "RAW CUSTOMERS" },
          { value: "20.37%", label: "CHURN RATE" },
          { value: "0.48", label: "BASELINE RECALL" },
          { value: "0.75", label: "SMOTE RECALL" },
          { value: "0.51", label: "SMOTE PRECISION" },
          { value: "0.8515", label: "ROC-AUC SCORE" },
        ]}
      />

      <MasterFlow
        title="CHURN PREDICTION MASTERFLOW"
        nodes={[
          { step: "01", title: "Data Preparation", description: "10,000 retail bank customer profiles & 20.37% baseline churn distribution" },
          { step: "02", title: "Preprocessing", description: "Standard scaling, categorical encoding & SMOTE oversampling for imbalanced class" },
          { step: "03", title: "Neural Architecture", description: "Multi-layer perceptron neural network with Dropout & Early Stopping" },
          { step: "04", title: "Probability Tuning", description: "Decision threshold calibration balancing Precision vs Recall trade-offs" },
          { step: "05", title: "Confusion Matrix", description: "Evaluation of False Negatives (uncaught churners) vs False Positives" },
          { step: "06", title: "Business Retention", description: "Targeted retention workflow intervention based on calibrated probability" },
        ]}
      />

      <TruthBoundary
        implemented={[
          "10,000 raw retail banking customer profiles with 20.37% churn prevalence.",
          "Neural network classifier achieving 0.8515 ROC-AUC.",
          "SMOTE oversampling boosting recall from baseline 0.48 to 0.75 at 0.51 precision.",
          "Threshold trade-off analysis evaluating false negative retention cost.",
        ]}
        illustrative={[
          "Synthetic campaign cost assumptions used for ROI illustration.",
          "Live real-time streaming API integration is illustrative.",
        ]}
      />

      <div className="p-6 rounded-2xl bg-surface-raised border border-hairline font-mono text-xs text-ink-muted space-y-2 text-center">
        <span className="text-accent font-bold uppercase tracking-wider block">// MASTERCLASS UNDER DEVELOPMENT</span>
        <p className="font-sans text-sm">
          Detailed neural network layer diagrams and interactive confusion matrix sliders will be built in upcoming packs.
        </p>
      </div>
    </div>
  );
}
