---
title: "Credit Risk Framework: PD, LGD, and EAD Modeling"
date: "2026-03-05"
tag: "RISK"
protocol: "1"
status: "POLISHED"
excerpt: "End-to-end Python scorecard framework covering Probability of Default, Exposure at Default, and Loss Given Default with strict validation metrics."
---

# Predictive Credit Risk Modeling

In modern wholesale and retail portfolios, capital allocation is governed by precise statistical inference. This framework outlines the development and validation of an internal ratings-based (IRB) approach to credit risk.

## The Expected Loss Architecture
The foundation of the scorecard relies on calculating Expected Loss (EL) to provision for regulatory capital requirements. 

The core formula:
$$EL = PD \times LGD \times EAD$$

- **PD (Probability of Default):** Modeled using Logistic Regression and XGBoost on historical portfolio data.
- **LGD (Loss Given Default):** Calculated through recovery rate historical distributions.
- **EAD (Exposure at Default):** Modeled utilizing Credit Conversion Factors (CCF) for revolving and term facilities.

## Validation & Ongoing Monitoring
A model is only as robust as its validation framework. To ensure conceptual soundness and compliance with model risk governance, the following performance testing metrics were engineered into the pipeline:

1. **Discriminatory Power:** Evaluated using the Kolmogorov-Smirnov (KS) statistic, Gini coefficient, and ROC-AUC. 
2. **Stability Monitoring:** Population Stability Index (PSI) and Characteristic Stability Index (CSI) are tracked to identify data drift and ensure the model remains fit-for-purpose across economic cycles.

**Stack:** Python, Scikit-learn, SQL, Pandas.