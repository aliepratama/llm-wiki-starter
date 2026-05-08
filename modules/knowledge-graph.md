# Module: Knowledge Graph Mode

This module adds a text-based Knowledge Graph to the LLM Wiki to save tokens and provide semantic priority mapping. 

## 🔌 How to Activate
This module is implicitly active ONLY IF its checkbox is ticked (`[x]`) in the root **`CONFIG.md`** file.
When enabled, the Agent MUST follow these strict rules during all Ingest and Query operations.

## Graph Modifications during Ingest
- **Extract Triplets**: The AI must parse new knowledge into relational triplets and append them to `wiki/graph/network.md`.
- **Pre-Query Routing**: Before opening full wiki files to answer a question, the AI must ALWAYS read `wiki/graph/network.md` first to map out relationships and identify which specific nodes (files) have high-weight relevance.

## Strict Graph Semantics & Do's and Don'ts
To maintain a healthy graph, the Agent must strictly adhere to the following when writing to `wiki/graph/network.md`:

**Format:** `[[Node A]] --(predicate | W:weight)--> [[Node B]]`

- **Node Definition**: `[[Node Name]]` MUST exactly match the resulting filename or alias in the `wiki/` folder. Be consistent with Title Case.
- **Predicate**: Must be a very short verb phrase (1 to 4 words max). Example: `is built upon`, `requires`, `contradicts`.
- **Weight (W:)**: Must be `0.1` to `1.0`. `1.0` is a vital core connection, `0.1` is trivia.

### DO's:
- **DO** consolidate identical relationships by updating their weight rather than duplicating rows.
- **DO** use bidirectional lines if the relationship is truly mutual, otherwise assume directional flow (A points to B).
- **DO** read the graph to trace high-weight paths (W > 0.5) before extracting deep context from `.md` files.

### DON'TS:
- **DON'T** write paragraphs or explanations in the predicate. (e.g., `--(which was founded in 1999)-->` is FORBIDDEN).
- **DON'T** create empty nodes that don't have a corresponding markdown file in the `wiki/` folder.
- **DON'T** over-saturate. Only map concepts that are actually important to the long-term knowledge base.
