---
term: "Context Window"
relatedTrack: "transformers"
---

## Plain definition
A context window represents the total volume of input and output text (measured in tokens) that a generative model can actively process and remember during a single inference execution.

## Why it matters
All system instructions, user queries, external data retrieves, and dynamic agent memories must sit within the context window boundary. If this boundary is exceeded, the model starts discarding older context details, breaking consistency.
