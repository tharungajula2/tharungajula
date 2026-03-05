---
title: "Ensemble Methods: Socio-Economic Classification"
date: "2026-03-05"
tag: "DATA"
protocol: "0"
status: "POLISHED"
excerpt: "End-to-end ML pipeline classifying household socio-economic status from national survey data, deriving critical feature importances."
---

# Public Policy & XGBoost Ensembles

Classifying socio-economic status from massive, noisy national survey datasets requires algorithms that can handle missing values and complex, non-linear feature interactions.

## The XGBoost Framework
I deployed an XGBoost (Extreme Gradient Boosting) ensemble. By iteratively adding decision trees that predict the residuals of prior trees, the model aggressively minimizes the objective function, balancing predictive power with structural simplicity:

$$\text{Obj} = \sum_{i=1}^{n} L(y_i, \hat{y}_i) + \sum_{k=1}^{K} \Omega(f_k)$$
*(Where $L$ represents the training loss and $\Omega$ penalizes model complexity).*

## Strategic Impact
The pipeline achieved **84% accuracy** in household classification. The true value of the architecture, however, was derived through feature importance tracking. By quantifying exactly *which* underlying variables most strongly predicted socio-economic status, the model provided data-driven insights to guide resource allocation and policy design.

**Stack:** Python, XGBoost, Scikit-learn, Data Wrangling.