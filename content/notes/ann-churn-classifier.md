---
title: "Deep Learning: ANN Customer Churn Classification"
date: "2026-03-05"
tag: "AI-ML"
protocol: "3"
status: "POLISHED"
excerpt: "Artificial Neural Network architecture achieving 75% recall in identifying at-risk banking entities."
---

# Neural Architectures for At-Risk Identification

Traditional linear models often fail to capture the complex, non-linear interactions within customer behavior datasets. To solve this, I engineered an Artificial Neural Network (ANN) to proactively identify bank churn and at-risk profiles.

## Architecture & Hyperparameters
The network utilizes a multi-layer perceptron architecture designed to prevent over-fitting while maximizing predictive power on imbalanced data.

- **Hidden Layers:** Configured with ReLU activation functions for computational efficiency.
- **Regularization:** Implemented Dropout layers and Batch Normalization to ensure generalization across unseen validation sets.
- **Optimization:** Utilized Binary Cross-Entropy loss.

The loss function optimized during training:
$$L = - \frac{1}{N} \sum_{i=1}^{N} [y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i)]$$

## Business Optimization: Maximizing Recall
In risk detection, false negatives (failing to identify an at-risk entity) carry a much higher business cost than false positives. The threshold logic was explicitly tuned to maximize **Recall**, achieving an operational rate of **75%**. This allows intervention teams to capture the vast majority of true positives before attrition or default occurs.

**Stack:** Python, TensorFlow/Keras, Scikit-learn.