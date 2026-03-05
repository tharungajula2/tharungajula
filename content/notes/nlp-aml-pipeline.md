---
title: "NLP Pipelines: Unstructured Text & Adverse Media"
date: "2026-03-05"
tag: "DATA"
protocol: "3"
status: "POLISHED"
excerpt: "Natural Language Processing pipeline leveraging TF-IDF and Random Forest for high-accuracy text classification and sentiment extraction."
---

# Unstructured Data & NLP Classification

Financial institutions generate massive amounts of unstructured text. From Adverse Media Screening in Anti-Money Laundering (AML) to customer sentiment, extracting quantitative signals from text is critical.

## Feature Engineering: TF-IDF
To transform raw text into a machine-readable format without losing contextual weighting, I implemented a Term Frequency-Inverse Document Frequency (TF-IDF) vectorizer. This mathematically penalizes common words and highlights unique, highly-predictive terms.

The weighting calculation:
$$W_{i,j} = tf_{i,j} \times \log\left(\frac{N}{df_i}\right)$$

## The Pipeline
- **Preprocessing:** SpaCy and NLTK utilized for tokenization, lemmatization, and stop-word removal.
- **Imbalance Handling:** Synthetic Minority Over-sampling Technique (SMOTE) applied to balance the training classes.
- **Classification Engine:** A Random Forest ensemble model achieved **77% accuracy** on the test set, proving robust generalization capabilities. 

This architecture serves as the foundational logic for automated text classification, entity extraction, and sentiment monitoring in highly regulated environments.

**Stack:** Python, NLTK, SpaCy, Scikit-learn.