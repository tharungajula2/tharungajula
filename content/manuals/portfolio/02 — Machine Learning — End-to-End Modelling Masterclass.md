# 02 — Machine Learning — End-to-End Modelling Masterclass

> **Problem → Data → Baseline → Diagnose → Model → Validate → Tune → Explain → Stress → Deploy → Monitor**

---

# 0. The Entire ML Process in One Screen

`Business problem`
→ `Target + prediction unit`
→ `Metric`
→ `Data audit`
→ `Train / Validation / Test`
→ `EDA`
→ `Pre-processing`
→ `Simple baseline`
→ `Linear / Logistic`
→ `Regularisation`
→ `Decision Tree`
→ `Bagging / Random Forest`
→ `Boosting / Gradient Boosting`
→ `ANN`
→ `Cross-validation`
→ `Hyperparameter tuning`
→ `Calibration / Threshold`
→ `Explainability`
→ `Error analysis`
→ `Stress / robustness`
→ `Final untouched test`
→ `Deployment`
→ `Monitoring / retraining`

## Golden rule

> **Never jump to the most complex model first.**

Start simple → understand errors → add complexity only when it solves a demonstrated problem.

---

# 1. First Question — What Kind of ML Problem?

| Question | Problem | Typical output |
|---|---|---|
| Predict continuous number? | **Regression** | price, loss, demand |
| Predict class / probability? | **Classification** | default / fraud / churn |
| No target; discover groups? | **Clustering** | segments |
| Compress correlated dimensions? | **Dimensionality reduction** | PCA components |
| Predict ordered class? | **Ordinal classification** | risk grade |
| Predict event + timing? | **Survival modelling** | time to default |
| Ordered observations over time? | **Time-series / temporal ML** | next-period demand |

### Then define

**Observation unit**  
→ customer / loan / transaction / month?

**Target**  
→ exactly what are we predicting?

**Prediction horizon**  
→ next 30 days / 12 months / lifetime?

**Prediction time**  
→ what information actually exists when prediction is made?

That final question prevents **data leakage**.

---

# 2. Business Objective ≠ ML Metric

Example:

> “Identify borrowers likely to default.”

Still incomplete.

Need:

`Business decision`
→ `Prediction`
→ `Cost of errors`
→ `Metric`
→ `Threshold`

## Classification error economics

| Reality | Prediction | Outcome |
|---|---|---|
| Positive | Positive | TP |
| Negative | Negative | TN |
| Negative | Positive | FP |
| Positive | Negative | FN |

### Metric choice depends on error cost

| Need | Focus |
|---|---|
| Catch almost every positive | **Recall** |
| Positive alerts must be reliable | **Precision** |
| Balance precision + recall | **F1** |
| Rank positives above negatives | **ROC-AUC / Gini** |
| Rare positive class | **PR-AUC** |
| Accurate probabilities | **Log Loss / Brier / Calibration** |
| Correct final decisions | threshold + business cost |

---

# 3. Data Split Before Modelling

## Standard IID case

`Train`
→ learn parameters

`Validation`
→ choose models / hyperparameters

`Test`
→ final unbiased estimate

Typical conceptual split:

**Train / Validation / Test**

or

**Train + Cross-validation / Test**

---

## Temporal problem

Never randomly mix future and past.

`Past`
→ Train

`Later`
→ Validation

`Latest`
→ OOT Test

### Rule

> **Model must never learn from information that would not have existed at prediction time.**

---

# 4. Leakage — The Silent Model Killer

## Target leakage

Feature contains information caused by or recorded after target.

Example:

`default recovery amount`
→ predicting default

Impossible at prediction time.

## Train-test leakage

Pre-processing fitted before split.

Wrong:

`All data → Scale → Split`

Correct:

`Split → Fit scaler on Train → Transform Validation/Test`

Same rule for:

- imputation
- WoE
- feature selection
- PCA
- target encoding
- SMOTE
- outlier thresholds
- transformations

---

# 5. Initial Data Audit

Before EDA:

| Check | Question |
|---|---|
| Shape | rows × columns |
| Grain | what does one row represent? |
| Target | class balance / distribution |
| IDs | true feature or identifier? |
| Missing | random or informative? |
| Duplicates | duplicate entity / observation? |
| Dates | chronological consistency? |
| Categories | rare / unseen levels? |
| Numeric ranges | impossible values? |
| Outliers | error or real extreme? |
| Leakage | available at prediction time? |
| Sampling | representative population? |

---

# 6. EDA — Only Questions That Change Modelling

## Target

Regression:

- distribution
- skew
- zeros
- tails

Classification:

- class proportions
- rare-event severity

## Feature → Target

Numeric:

`distribution`
→ `relationship`
→ `non-linearity`
→ `outliers`

Categorical:

`category frequency`
→ `target rate by category`

## Feature → Feature

Check:

- correlation
- redundant variables
- multicollinearity
- duplicate information
- interaction opportunities

---

# 7. Missing Values

Missingness itself can contain information.

| Situation | Approach |
|---|---|
| Small random numeric missingness | median |
| Numeric with meaningful missingness | median + missing flag |
| Categorical | explicit `"Missing"` |
| Highly missing variable | challenge usefulness |
| Tree models | some implementations handle missingness natively |

### Never

Blindly drop rows without checking whether removal changes population.

---

# 8. Outliers

Three possibilities:

`Data error`
→ correct / remove

`Valid extreme`
→ retain

`Valid but destabilising`
→ transform / winsorise / robust model

### Models sensitive to scale/extremes

- Linear Regression
- Logistic Regression
- KNN
- SVM
- ANN

### Trees

Much less sensitive to scaling and monotonic transformations.

---

# 9. Categorical Encoding

| Method | Best use | Risk |
|---|---|---|
| One-hot | low/moderate cardinality | dimensional explosion |
| Ordinal encoding | genuinely ordered categories | false ordering otherwise |
| Frequency | high cardinality | weak target relationship |
| Target encoding | strong high-cardinality option | leakage |
| WoE | binary risk modelling | must fit train only |

---

# 10. Scaling

Needed when model depends on **distance or coefficient optimisation**.

| Model | Scaling? |
|---|---|
| Linear Regression | recommended |
| Logistic Regression | recommended, especially regularisation |
| KNN | **Yes** |
| SVM | **Yes** |
| ANN | **Yes** |
| PCA | **Yes** |
| Decision Tree | No |
| Random Forest | No |
| Gradient Boosted Trees | No |

Common:

$$
\displaystyle z = \frac{x-\mu}{\sigma}
$$

---

# 11. The Baseline

Before sophisticated modelling, establish something deliberately simple.

## Regression

- mean prediction
- median prediction
- simple Linear Regression

## Classification

- majority class
- observed positive rate
- Logistic Regression

### Baseline question

> **Does complexity produce meaningful out-of-sample improvement?**

Without a baseline, “good performance” has no context.

---

# 12. Statistical Modelling vs Machine Learning

| Statistical modelling | Predictive ML |
|---|---|
| Explain relationships | Predict accurately |
| Coefficient inference | Generalisation |
| Assumptions important | Out-of-sample performance dominant |
| p-values / CI | CV / validation |
| parsimonious model | complexity acceptable |
| causal questions sometimes | usually predictive |

They overlap.

**Linear and Logistic Regression can be both statistical models and ML algorithms.**

---

# 13. Linear Regression

Prediction:

$$
\displaystyle \hat y = \beta_0+ \beta_1x_1+ \cdots+ \beta_px_p
$$

Fit by minimising:

$$
\displaystyle SSE = \sum (y_i-\hat y_i)^2
$$

## Coefficient interpretation

$$
\displaystyle \beta_j
$$

≈ expected change in $y$ for one-unit increase in $x_j$, **holding other variables constant**.

---

# 14. Linear Regression Assumptions

Think **LINE + X**:

| Assumption | Meaning | Diagnose |
|---|---|---|
| Linearity | conditional mean relationship approximately linear | residual plots |
| Independence | observations/errors independent | study design / time dependence |
| Normality of residuals | important mainly for classical inference | Q-Q plot |
| Equal variance | homoscedastic residuals | residual vs fitted |
| No severe multicollinearity | predictors not redundant | VIF / correlation |
| Correct specification | important variables / forms represented | residual structure |

### Important

Normality of **features** is not required.

The classical assumption concerns **residuals**, primarily for inference.

---

# 15. Linear Regression Statistical Tests

## Individual coefficient

$$
\displaystyle H_0:\beta_j=0
$$

t-test:

$$
\displaystyle t=\frac{\hat\beta_j}{SE(\hat\beta_j)}
$$

Small p-value:

→ evidence coefficient differs from zero under model assumptions.

---

## Overall model

F-test:

$$
\displaystyle H_0: \beta_1=\beta_2=\cdots=\beta_p=0
$$

Tests whether predictors collectively explain variation.

---

## Confidence interval

$$
\displaystyle \hat\beta_j \pm t^*SE(\hat\beta_j)
$$

---

# 16. Regression Diagnostics

## Residual

$$
\displaystyle e_i=y_i-\hat y_i
$$

Ideal:

`random`
→ around zero
→ no obvious structure

### Warning patterns

| Pattern | Possible issue |
|---|---|
| Curve | non-linearity |
| Funnel | heteroscedasticity |
| Clusters | missing segment variable |
| Large isolated residual | influential observation |
| Time pattern | serial correlation |

---

# 17. Multicollinearity

Predictors explain each other.

Consequences:

- unstable coefficients
- large standard errors
- coefficient signs can flip
- interpretation becomes difficult

## VIF

$$
\displaystyle VIF_j = \frac{1}{1-R_j^2}
$$

Higher VIF:

→ stronger multicollinearity.

### Solutions

- remove redundant variable
- combine variables
- PCA
- Ridge
- accept if prediction is good and inference is not priority

---

# 18. Regression Metrics

## MAE

$$
\displaystyle MAE= \frac{1}{n}\sum|y-\hat y|
$$

Easy interpretation.

## MSE

$$
\displaystyle MSE= \frac{1}{n}\sum(y-\hat y)^2
$$

Punishes large errors heavily.

## RMSE

$$
\displaystyle RMSE=\sqrt{MSE}
$$

Same units as target.

## $R^2$

$$
\displaystyle R^2= 1- \frac{SS_{res}}{SS_{tot}}
$$

Fraction of variance explained relative to mean baseline.

### Never rely on $R^2$ alone.

---

# 19. When Linear Regression Is Not Enough

Residual curve?

→ transformations / interactions / splines / tree models

Extreme values?

→ robust approaches

Highly non-linear relationship?

→ trees / boosting / ANN

Many correlated variables?

→ regularisation

---

# 20. Logistic Regression

For binary target:

$$
\displaystyle p=P(Y=1|X)
$$

Log odds:

$$
\displaystyle \log \left( \frac{p}{1-p} \right) = \beta_0+\beta_1x_1+\cdots+\beta_px_p
$$

Probability:

$$
\displaystyle p= \frac{1}{1+e^{-z}}
$$

where

$$
\displaystyle z=\beta_0+\beta_1x_1+\cdots+\beta_px_p
$$

---

# 21. Logistic Coefficient Interpretation

$$
\displaystyle e^{\beta_j}
$$

= **odds ratio**

Example:

$$
\displaystyle e^{\beta_j}=1.4
$$

→ one-unit increase in $x_j$ multiplies odds by **1.4**, holding others fixed.

Not:

> probability increases by 40%.

**Odds ≠ probability.**

---

# 22. Logistic Regression Assumptions / Checks

| Check | Meaning |
|---|---|
| Binary target | basic logistic case |
| Independent observations | avoid correlated errors |
| Linear relationship with log-odds | continuous variables |
| No severe multicollinearity | coefficient stability |
| Adequate events | estimation stability |
| No complete separation | predictors cannot perfectly isolate class |

Logistic does **not** require:

- normally distributed predictors
- normally distributed residuals
- constant residual variance

---

# 23. Logistic Statistical Tests

## Wald test

$$
\displaystyle H_0:\beta_j=0
$$

Tests individual coefficient.

## Likelihood Ratio Test

Compare:

`Restricted model`
vs
`Larger model`

$$
\displaystyle LR= -2(\log L_{restricted}-\log L_{full})
$$

Tests whether added parameters meaningfully improve likelihood.

---

# 24. Classification Metrics

## Precision

$$
\displaystyle Precision= \frac{TP}{TP+FP}
$$

Of predicted positives, how many were correct?

## Recall

$$
\displaystyle Recall= \frac{TP}{TP+FN}
$$

Of actual positives, how many did we catch?

## Specificity

$$
\displaystyle Specificity= \frac{TN}{TN+FP}
$$

## F1

$$
\displaystyle F1= 2 \frac{Precision\times Recall} {Precision+Recall}
$$

---

# 25. ROC and AUC

ROC:

`TPR`
vs
`FPR`

across all thresholds.

## AUC intuition

Probability that randomly selected positive gets ranked above randomly selected negative.

$$
\displaystyle Gini=2AUC-1
$$

### AUC measures

**Ranking**

Not necessarily:

**probability calibration**

---

# 26. Precision-Recall Curve

Better than ROC-AUC when positive class is very rare and focus is on positive detection.

Axes:

`Recall`
vs
`Precision`

Summary:

**PR-AUC**

---

# 27. Probability Calibration

Suppose model assigns **20% probability** to many cases.

A calibrated model should observe roughly:

**20% positives** among such cases.

## Metrics / diagnostics

- calibration curve
- Brier Score
- Log Loss
- calibration intercept/slope
- Hosmer-Lemeshow in traditional settings

### Calibration methods

- Platt scaling
- isotonic regression
- intercept recalibration

### Key distinction

> **Discrimination = who is riskier?**

> **Calibration = how risky are they?**

---

# 28. Threshold Is a Business Decision

Logistic model outputs:

$$
\displaystyle P(Y=1)
$$

It does **not inherently require 0.50**.

Choose threshold using:

- cost FP
- cost FN
- capacity
- risk appetite
- precision/recall requirement
- profit/loss function

### Therefore

**Model development**
and
**decision policy**

are related but separate.

---

# 29. Regularisation

Controls model complexity.

General objective:

$$
\displaystyle Loss+\lambda Penalty
$$

---

## Ridge — L2

$$
\displaystyle Penalty= \lambda\sum\beta_j^2
$$

Effect:

→ shrinks coefficients  
→ usually retains all predictors

Best when:

- many correlated variables
- stability needed

---

## Lasso — L1

$$
\displaystyle Penalty= \lambda\sum|\beta_j|
$$

Effect:

→ some coefficients become exactly zero

Useful for:

- sparse model
- embedded feature selection

---

## Elastic Net

$$
\displaystyle L1+L2
$$

Useful when:

- many predictors
- correlated groups
- some sparsity desired

---

# 30. Bias–Variance Trade-off

## Underfitting

**High bias**

- train poor
- validation poor

Need:

→ more flexible model  
→ better features  
→ less regularisation

---

## Overfitting

**High variance**

- train excellent
- validation poor

Need:

→ simpler model  
→ more data  
→ stronger regularisation  
→ pruning  
→ bagging  
→ early stopping

---

# 31. Learning Curves

Compare performance as training data increases.

### Pattern

Train poor + Validation poor

→ **underfitting**

Train strong + Validation weak, gap remains

→ **overfitting**

Both improve and converge

→ healthy

Validation still improving strongly with more data

→ more data may help

---

# 32. Decision Tree

Tree recursively asks:

`Feature`
→ `Split`
→ `Branch`
→ `Leaf prediction`

Example:

`Income < threshold?`
→ yes/no
→ another split
→ final prediction

---

# 33. How Trees Choose Splits

## Classification — Gini Impurity

$$
\displaystyle Gini= 1-\sum_k p_k^2
$$

## Entropy

$$
\displaystyle Entropy= -\sum_k p_k\log p_k
$$

Best split:

→ greatest impurity reduction.

---

## Regression

Often minimise:

**MSE / variance within children**

---

# 34. Why Trees Are Powerful

Naturally capture:

- non-linearity
- interactions
- thresholds
- mixed feature effects

Usually no need for:

- scaling
- polynomial terms
- linearity assumptions

### Weakness

Single trees have **high variance**.

Small data change:

→ very different tree.

---

# 35. Controlling Tree Complexity

Important parameters:

| Parameter | Controls |
|---|---|
| `max_depth` | tree depth |
| `min_samples_split` | minimum samples to split |
| `min_samples_leaf` | leaf size |
| `max_leaf_nodes` | total leaves |
| `max_features` | variables considered |
| pruning alpha | post-growth pruning |

Smaller tree:

→ more bias  
→ less variance

Larger tree:

→ less bias  
→ more variance

---

# 36. Ensemble Learning

Core idea:

> **Combine weak / unstable models into a stronger predictor.**

Two major families:

## Bagging

Models built **independently / parallel**

Goal:

→ reduce variance

## Boosting

Models built **sequentially**

Goal:

→ correct previous errors

---

# 37. Bagging

**Bootstrap Aggregating**

Process:

`Original Train`
→ sample with replacement
→ fit Model 1

→ another bootstrap
→ Model 2

→ ...

Predictions:

Regression:

$$
\displaystyle \hat y= \frac{1}{B}\sum_b \hat y_b
$$

Classification:

→ average probabilities / vote.

### Why it works

Individual trees:

**high variance**

Averaging many:

→ variance falls.

---

# 38. Random Forest

Random Forest =

**Bagging + random feature subsets**

At each tree split:

only a random subset of predictors is considered.

### Why random features?

Without feature randomness:

strong predictor dominates every tree  
→ trees become highly correlated  
→ averaging helps less

Random subsets:

→ decorrelate trees  
→ stronger ensemble.

---

# 39. Random Forest Characteristics

### Strengths

- excellent tabular baseline
- nonlinearities
- interactions
- little preprocessing
- robust
- handles many predictors

### Weaknesses

- less interpretable
- large models
- probability calibration may need checking
- poor extrapolation in regression
- often beaten by tuned boosting on structured tabular data

---

# 40. Random Forest Tuning

| Parameter | Effect |
|---|---|
| `n_estimators` | number of trees |
| `max_depth` | individual complexity |
| `max_features` | tree diversity |
| `min_samples_leaf` | regularisation |
| `min_samples_split` | split control |
| `class_weight` | imbalance handling |

General pattern:

More trees:

→ lower ensemble variance  
→ more computation  
→ usually not more overfitting in the same way as deeper individual trees.

---

# 41. Out-of-Bag Validation

Each bootstrap tree excludes some training observations.

Those excluded cases:

→ **OOB observations**

Use them to estimate performance without a separate validation prediction for that tree.

Useful RF diagnostic:

**OOB score**

---

# 42. Boosting

Instead of independent models:

`Model 1`
→ errors
→ `Model 2 focuses on errors`
→ errors
→ `Model 3`
→ ...

Final prediction:

$$
\displaystyle F(x)= \sum_m \alpha_m h_m(x)
$$

Many small learners:

→ strong model.

---

# 43. AdaBoost

Sequentially increases attention on misclassified observations.

Conceptually:

`Wrong observations`
→ higher weight
→ next learner focuses more heavily on them

Works with weak learners, traditionally shallow trees.

### Weakness

Sensitive to:

- noisy labels
- outliers

because difficult observations keep receiving attention.

---

# 44. Gradient Boosting

Different perspective:

Each new model fits the **residual error / negative gradient** of current ensemble.

Regression intuition:

Initial:

$$
\displaystyle F_0(x)=mean(y)
$$

Residual:

$$
\displaystyle r_i=y_i-F_0(x_i)
$$

Fit tree to residuals.

Update:

$$
\displaystyle F_1(x)=F_0(x)+\eta h_1(x)
$$

Repeat.

---

# 45. Learning Rate × Number of Trees

$$
\displaystyle F_M(x)= F_0(x)+ \eta\sum_{m=1}^{M}h_m(x)
$$

where:

$$
\displaystyle \eta = learning\ rate
$$

Small learning rate:

→ smaller corrections  
→ usually more trees required

Large learning rate:

→ fast learning  
→ greater overfitting risk

These parameters must be tuned **together**.

---

# 46. Gradient Boosting Regularisation

Main controls:

| Parameter | Controls |
|---|---|
| learning rate | contribution of each tree |
| number trees | ensemble size |
| tree depth | interaction complexity |
| min leaf size | local complexity |
| subsample | stochastic boosting |
| feature subsample | diversity |
| early stopping | stop before overfit |

---

# 47. Modern Boosted Trees

Family includes:

- Gradient Boosting Machines
- XGBoost
- LightGBM
- CatBoost

Same broad concept:

> sequential tree ensemble minimising a loss function.

### Why popular for tabular data?

Strong at:

- non-linearities
- interactions
- mixed signal strengths
- missing-value patterns
- moderate/large structured datasets

---

# 48. Bagging vs Boosting

| | Bagging | Boosting |
|---|---|---|
| Models | parallel | sequential |
| Main target | variance | bias + residual error |
| Typical base learner | full/deeper trees | shallow trees |
| Example | Random Forest | Gradient Boosting |
| Noise sensitivity | lower | higher |
| Tuning sensitivity | moderate | high |
| Overfitting control | averaging | learning rate / depth / stopping |

---

# 49. Linear vs Tree vs Ensemble

| Model | Main strength | Main weakness |
|---|---|---|
| Linear | transparent | linear structure |
| Logistic | interpretable probability | linear log-odds |
| Tree | non-linear + interpretable | unstable |
| Random Forest | robust ensemble | less interpretable |
| Gradient Boosting | powerful tabular model | tuning |
| ANN | flexible representation | data + tuning + interpretation |

---

# 50. Artificial Neural Network

Basic unit:

$$
\displaystyle z= w_1x_1+\cdots+w_px_p+b
$$

Activation:

$$
\displaystyle a=f(z)
$$

Network:

`Inputs`
→ `Hidden Layer`
→ `Hidden Layer`
→ `Output`

Each layer learns a representation of previous layer.

---

# 51. Activation Functions

## ReLU

$$
\displaystyle ReLU(x)=\max(0,x)
$$

Common hidden-layer default.

## Sigmoid

$$
\displaystyle \sigma(x)=\frac{1}{1+e^{-x}}
$$

Useful binary output.

## Softmax

$$
\displaystyle P(Y=k)= \frac{e^{z_k}} {\sum_j e^{z_j}}
$$

Multiclass output.

---

# 52. Forward Propagation

Data moves through network:

`X`
→ weighted sums
→ activations
→ prediction

Then loss measured.

Classification:

**Cross-Entropy**

Regression:

**MSE / MAE etc.**

---

# 53. Backpropagation

Compute:

$$
\displaystyle \frac{\partial Loss}{\partial w}
$$

for each weight using chain rule.

Then optimizer updates:

$$
\displaystyle w_{new} = w_{old} - \eta \frac{\partial Loss}{\partial w}
$$

That repeated process:

→ **training**

---

# 54. Epoch / Batch / Iteration

| Term | Meaning |
|---|---|
| Epoch | one complete pass through training data |
| Batch | subset processed together |
| Iteration | one parameter update |

Example:

10,000 rows  
batch size 100

→ **100 iterations per epoch**

---

# 55. ANN Optimizers

## Gradient Descent

Entire dataset per update.

## SGD

One / small sample.

## Mini-batch GD

Practical standard.

## Adam

Adaptive learning rates + momentum-style behaviour.

Common strong default.

---

# 56. ANN Regularisation

### Dropout

Randomly deactivate neurons during training.

→ prevents co-adaptation

### L1 / L2

Penalise weights.

### Early stopping

Monitor validation loss.

Stop when improvement stops.

### Batch normalisation

Normalises intermediate activations and can stabilise training.

---

# 57. When ANN Makes Sense

Strong when:

- huge datasets
- image
- text
- audio
- complex high-dimensional interactions
- representation learning needed

For ordinary structured tabular data:

> **Do not assume ANN beats boosting.**

Compare empirically.

---

# 58. Feature Engineering

A model only sees the representation given to it.

Useful transformations:

$$
\displaystyle x \rightarrow \log(x)
$$

$$
\displaystyle x_1,x_2 \rightarrow x_1x_2
$$

$$
\displaystyle Date \rightarrow Age / Tenure / Month / Season
$$

$$
\displaystyle Amount,\ Income \rightarrow Amount/Income
$$

### But

Every engineered feature must exist at **prediction time**.

---

# 59. Feature Selection

Three families.

## Filter

Independent of final model.

Examples:

- correlation
- mutual information
- IV
- statistical tests

## Wrapper

Repeatedly evaluate subsets.

Examples:

- recursive feature elimination

## Embedded

Selection occurs during training.

Examples:

- Lasso
- tree importance

---

# 60. Statistical Significance ≠ Predictive Importance

A variable can be:

**statistically significant**
but add almost no predictive value.

Or:

**not individually significant**
but useful through interaction/non-linearity.

Therefore:

For predictive ML use:

`Validation performance`

not merely:

`p < 0.05`

---

# 61. Cross-Validation

## K-Fold

Split training data into K folds.

Each fold becomes validation once.

$$
\displaystyle CV\ Score= \frac{1}{K} \sum_{k=1}^{K} Score_k
$$

Benefits:

- lower dependence on one split
- model comparison
- tuning

---

## Stratified K-Fold

Classification:

preserves class proportions.

---

## Group K-Fold

Same entity must never appear in train and validation simultaneously.

Example:

multiple rows per customer.

---

## Time-Series CV

Never shuffle.

`Train 1 → Validate 1`

`Train 1+2 → Validate 2`

`Train 1+2+3 → Validate 3`

---

# 62. Hyperparameters vs Parameters

## Parameters

Learned from data.

Examples:

- regression coefficients
- tree split thresholds
- neural-network weights

## Hyperparameters

Chosen externally.

Examples:

- max depth
- learning rate
- regularisation strength
- number of trees
- hidden layers

---

# 63. Hyperparameter Tuning

## Grid Search

Try every combination.

Good:

→ small search space

Bad:

→ expensive

---

## Random Search

Sample combinations.

Often more efficient when only a few dimensions truly matter.

---

## Bayesian Optimisation

Uses previous trials to choose promising next combinations.

Useful for expensive models.

---

# 64. Correct Tuning Flow

**Never tune against test set.**

Correct:

`Train`
→ CV tuning
→ select hyperparameters
→ refit on Train
→ evaluate once on Test

If validation set exists:

`Train`
→ tune

`Validation`
→ model selection

`Test`
→ final untouched assessment

---

# 65. Model Selection Ladder

Use complexity progressively.

## Regression

`Mean baseline`
→ `Linear`
→ `Regularised Linear`
→ `Tree`
→ `Random Forest`
→ `Gradient Boosting`
→ `ANN`

## Classification

`Class-rate baseline`
→ `Logistic`
→ `Regularised Logistic`
→ `Tree`
→ `Random Forest`
→ `Gradient Boosting`
→ `ANN`

### At every step ask

> **What failure of the previous model am I fixing?**

---

# 66. Iterative Diagnostic Loop

## Case 1 — Train poor + Validation poor

**Underfitting**

Try:

- better features
- non-linear transformations
- interactions
- deeper tree
- boosting
- ANN

---

## Case 2 — Train excellent + Validation poor

**Overfitting**

Try:

- regularisation
- shallower models
- larger leaves
- fewer features
- dropout
- early stopping
- more data

---

## Case 3 — Ranking strong + probability wrong

**Calibration issue**

Try:

- intercept recalibration
- Platt
- isotonic

---

## Case 4 — Metrics good, business results bad

**Threshold/objective issue**

Try:

- cost-sensitive metric
- threshold optimisation
- segment thresholds
- expected value optimisation

---

## Case 5 — CV good, OOT poor

**Population drift / temporal instability**

Investigate:

- leakage
- concept drift
- feature drift
- new categories
- changed process
- changed target mechanism

---

# 67. Class Imbalance

Example:

99% negative  
1% positive

Predict everything negative:

**99% accuracy**

but model is useless.

### Use

- recall
- precision
- F1
- PR-AUC
- ROC-AUC
- confusion matrix
- cost-based metrics

---

# 68. Handling Imbalance

Options:

### Class weighting

Increase penalty for minority errors.

### Under-sampling

Reduce majority class.

### Over-sampling

Increase minority representation.

### SMOTE

Generate synthetic minority samples.

### Threshold adjustment

Often powerful without altering training distribution.

### Critical

Sampling/SMOTE must occur **inside training folds only**.

Never before train-test split.

---

# 69. Explainability

Three questions:

## Global

> What generally drives the model?

## Local

> Why this prediction?

## Direction

> How does prediction change as feature changes?

---

# 70. Feature Importance

Tree impurity importance:

easy but potentially biased.

Permutation importance:

shuffle one feature
→ measure performance drop.

Greater drop:

→ greater predictive dependence.

---

# 71. SHAP

Conceptually distributes prediction difference across features.

$$
\displaystyle Prediction = Baseline + \sum Feature\ Contributions
$$

Useful for:

- local explanation
- global importance
- direction
- interaction investigation

### Remember

SHAP explains:

> **model behaviour**

Not necessarily:

> **causal effect**

---

# 72. Partial Dependence

Shows average model prediction as one feature changes.

Useful for:

- nonlinear shape
- threshold behaviour

Caution:

correlated features can make unrealistic combinations.

---

# 73. Error Analysis — Where Models Actually Improve

After every candidate model:

Split errors by:

- class
- segment
- geography
- product
- time
- score band
- missingness
- feature ranges

Ask:

> Where exactly is the model failing?

Then decide:

`Data issue?`
`Feature issue?`
`Model issue?`
`Threshold issue?`
`Population issue?`

---

# 74. Robustness / Stress Testing

Before declaring winner:

## Stability

Train vs validation vs test vs OOT

## Segment stability

Performance by meaningful subgroup

## Missingness

What happens if key variable unavailable?

## Outliers

Sensitivity to extremes

## Noise

Small input change → huge prediction change?

## Temporal drift

Does performance decay through time?

---

# 75. Choosing the Winner

Do **not** automatically choose highest AUC.

Final selection should balance:

| Dimension | Question |
|---|---|
| Performance | does it predict well? |
| Calibration | are probabilities trustworthy? |
| Stability | does it generalise? |
| Interpretability | can it be explained? |
| Complexity | worth the gain? |
| Latency | fast enough? |
| Data dependency | features available reliably? |
| Governance | can it be validated? |
| Business value | does improvement matter financially? |

---

# 76. Complexity Must Earn Its Place

Suppose:

| Model | AUC |
|---|---:|
| Logistic | 0.78 |
| Random Forest | 0.80 |
| Boosting | 0.81 |
| ANN | 0.811 |

Do not conclude ANN automatically wins.

Ask:

> Is 0.001 incremental AUC worth additional infrastructure, instability and explainability cost?

Sometimes yes.

Often no.

---

# 77. Final Model Validation

Once modelling decisions are frozen:

evaluate **untouched test/OOT**.

Report:

### Performance

- primary metric
- secondary metrics
- confidence/variation where useful

### Calibration

- predicted vs observed
- calibration curve

### Stability

- train vs validation vs test
- segment performance

### Business outcome

- threshold
- confusion matrix
- cost / value

---

# 78. Deployment Pipeline

`Raw production data`
→ `same validation`
→ `same feature engineering`
→ `same preprocessing`
→ `model`
→ `probability / prediction`
→ `threshold / policy`
→ `business action`

### Best practice

Bundle transformations and model into one reproducible pipeline.

Training and production transformations must be identical.

---

# 79. What to Save

- model
- preprocessing
- feature list/order
- category maps
- imputation values
- scalers
- model version
- hyperparameters
- training population date
- metric results
- threshold
- code version

Prediction without versioning:

→ not reproducible.

---

# 80. Monitoring After Deployment

Four separate things.

## 1. Data quality

Are inputs arriving correctly?

## 2. Population drift

Has $P(X)$ changed?

Examples:

- PSI
- feature distributions

## 3. Performance drift

Has model accuracy/discrimination changed?

## 4. Concept drift

Has relationship changed?

$$
\displaystyle P(Y|X)_{today} \neq P(Y|X)_{train}
$$

This is the dangerous one.

---

# 81. Retraining Triggers

Potential signals:

`Performance deterioration`
→ investigate

`Population drift`
→ investigate

`Calibration drift`
→ recalibrate / retrain

`Business process changed`
→ model review

`New product/population`
→ redevelopment

### Never

Retrain automatically only because:

> “six months passed.”

Retraining should respond to evidence and governance requirements.

---

# 82. The Most Important Model Comparisons

| Question | Linear / Logistic | Tree | RF | Boosting | ANN |
|---|---|---|---|---|---|
| Linear assumption | Yes | No | No | No | No |
| Interactions automatically | No | Yes | Yes | Yes | Yes |
| Scaling required | Often | No | No | No | **Yes** |
| Interpretability | **High** | High | Medium | Medium/Low | Low |
| Outlier sensitivity | Higher | Low | Low | Medium | Higher |
| Tabular performance | Good baseline | Moderate | Strong | **Very strong** | Variable |
| Training complexity | Low | Low | Medium | High | High |
| Tuning need | Low | Medium | Medium | **High** | **High** |

---

# 83. Statistical Tests — One-Screen Reference

| Test | Typical question |
|---|---|
| t-test | does one coefficient / mean differ? |
| F-test | do predictors jointly add value? |
| Likelihood Ratio | does larger likelihood model improve fit? |
| Wald | is logistic coefficient non-zero? |
| Chi-square | association between categorical variables |
| ANOVA | mean difference across several groups |
| Mann-Whitney | two-group distribution/location comparison without normal assumption |
| Kruskal-Wallis | non-parametric multi-group comparison |
| Pearson correlation | linear association |
| Spearman correlation | monotonic association |
| Shapiro-Wilk | normality diagnostic |
| Levene / Breusch-Pagan | variance / heteroscedasticity checks |
| Durbin-Watson | residual autocorrelation diagnostic |
| Hosmer-Lemeshow | logistic calibration/grouped fit diagnostic |

### Critical rule

A statistical test only makes sense when its assumptions and sampling structure make sense.

---

# 84. p-Values — Correct Interpretation

A p-value is:

> Probability of observing data at least this inconsistent with $H_0$, **assuming $H_0$ and model assumptions are true**.

It is **not**:

- probability that null is true
- probability result happened by chance
- measure of business importance
- model-performance metric

Large datasets can make tiny, practically meaningless effects statistically significant.

---

# 85. Correlation ≠ Causation

Prediction only requires association.

Causal statement requires much more:

- causal design
- confounder control
- temporal ordering
- identification assumptions
- experiment / quasi-experiment where appropriate

A powerful ML model can be an excellent predictor while teaching nothing causal.

---

# 86. Universal Model-Building Algorithm

## STEP 1 — Frame

`Prediction unit`
+ `Target`
+ `Horizon`
+ `Decision`
+ `Metric`

## STEP 2 — Freeze holdout

Random / grouped / temporal as appropriate.

## STEP 3 — Audit data

Missing, duplicate, leakage, distributions, dates, categories.

## STEP 4 — Build pipeline

Imputation + encoding + scaling only as required.

## STEP 5 — Establish baseline

Simple statistical model.

## STEP 6 — Diagnose

Bias? variance? calibration? segment failure?

## STEP 7 — Increase complexity

`Linear/Logistic`
→ `Regularised`
→ `Tree`
→ `RF`
→ `Boosting`
→ `ANN`

## STEP 8 — Cross-validate

Use correct CV structure.

## STEP 9 — Tune

Optimise hyperparameters against validation/CV only.

## STEP 10 — Analyse errors

Understand exactly where gain/loss occurs.

## STEP 11 — Calibrate / choose threshold

Prediction model → business decision.

## STEP 12 — Explain

Global + local.

## STEP 13 — Stress

OOT + segments + drift + missingness.

## STEP 14 — Final test

Open untouched test once modelling is frozen.

## STEP 15 — Deploy + monitor

Same pipeline → version → monitor → retrain when justified.

---

# 87. If Model Performance Is Bad — Decision Tree

**Both train and validation poor?**

→ Underfit  
→ improve representation / complexity

**Train strong, validation poor?**

→ Overfit  
→ regularise / simplify / more data

**AUC strong, calibration poor?**

→ recalibrate

**Random split good, OOT poor?**

→ temporal drift / leakage investigation

**Overall good, one segment poor?**

→ segment analysis / missing interaction / population difference

**Metrics good, business economics poor?**

→ threshold / cost function wrong

**Boosting only marginally beats Logistic?**

→ consider Logistic for interpretability

**ANN not beating boosting on tabular data?**

→ don't use ANN merely because it is more complex.

---

# 88. Hyperparameter Cheat Sheet

| Model | First parameters to tune |
|---|---|
| Linear Ridge/Lasso | `alpha / lambda` |
| Logistic | `C / lambda`, penalty |
| Decision Tree | depth, min leaf |
| Random Forest | trees, depth, max features, min leaf |
| Gradient Boosting | learning rate, trees, depth, subsample |
| XGBoost/LightGBM | learning rate, depth/leaves, subsampling, regularisation |
| ANN | layers, neurons, LR, batch size, dropout, weight decay |

### Tuning priority

Do not tune everything simultaneously.

Start with parameters controlling:

**model capacity**

then:

**regularisation**

then:

**learning dynamics**

---

# 89. Model Improvement Hierarchy

Before trying a more exotic algorithm:

**1. Target quality**  
↓  
**2. Leakage-free data**  
↓  
**3. Correct split**  
↓  
**4. Better features**  
↓  
**5. Better validation**  
↓  
**6. Model choice**  
↓  
**7. Hyperparameter tuning**

Usually the biggest gains are **not** from hyperparameter search.

---

# 90. The Master Mental Model

Every supervised ML algorithm is trying to learn:

$$
\displaystyle X \longrightarrow f(X) \longrightarrow Y
$$

The algorithms differ mainly in the shape allowed for $f$.

### Linear Regression

$$
\displaystyle f(X)=linear
$$

### Logistic Regression

$$
\displaystyle f(X)=linear\ log\ odds
$$

### Tree

$$
\displaystyle f(X)=piecewise\ rules
$$

### Random Forest

$$
\displaystyle f(X)=average\ of\ many\ trees
$$

### Gradient Boosting

$$
\displaystyle f(X)=sum\ of\ sequential\ error-correcting\ trees
$$

### ANN

$$
\displaystyle f(X)=composition\ of\ learned\ nonlinear\ transformations
$$

And the modelling process is simply:

> **Start with the simplest credible $f$, measure what it cannot learn, increase flexibility only enough to fix that weakness, and continuously test whether the improvement survives unseen data.**

---

# 91. Final Interview Cheat Sheet

## Linear Regression

**Continuous target → linear conditional mean → OLS → coefficients → residual assumptions → MAE/RMSE/R²**

## Logistic Regression

**Binary target → log-odds → probability → odds ratios → discrimination + calibration → threshold**

## Regularisation

**L1 = sparse**  
**L2 = shrink**  
**Elastic Net = both**

## Decision Tree

**Recursive splits → nonlinear + interactions → interpretable → high variance**

## Bagging

**Independent bootstrap models → average → variance ↓**

## Random Forest

**Bagging + random features → decorrelated trees → robust ensemble**

## Boosting

**Sequential weak learners → correct previous errors**

## Gradient Boosting

**Fit residuals/gradients → learning rate × trees → powerful tabular model**

## ANN

**Weighted layers → activations → loss → backprop → gradient optimisation → deep nonlinear representation**

## Validation

**Train learns**  
**CV/Validation chooses**  
**Test proves**

## Final objective

> **Best model ≠ most complex model. Best model = strongest repeatable out-of-sample solution to the actual business problem.**