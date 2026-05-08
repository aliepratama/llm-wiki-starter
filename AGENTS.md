# LLM Wiki Agent System

This repository follows a knowledge curation structure inspired by the LLM wiki approach. It is designed to act as a centralized, persistent knowledge base and operational schema for managing evolving information across any domain.

## 1. What the Wiki Covers
This wiki captures and synthesizes information from various raw sources into a structured, compounding knowledge base. Instead of re-deriving answers from scratch, it maintains cross-references, topic summaries, and entity pages that grow richer over time.

## 2. Directory Rules
- **`raw/`**: Stores unstructured data and raw exports. These files are *immutable* — they are read but never modified.
- **`wiki/`**: The structured markdown brain of the wiki. The AI owns this layer entirely: creating, updating, and cross-referencing pages.
  - **`wiki/graph/`**: A special directory managed by the AI when Graph Mode is enabled. Contains mapping files like `network.md`.
  - **YAML Frontmatter Required**: Every page must have YAML metadata (e.g., `tags:`, `aliases:`) to assist parsing.
- **`outputs/`**: Generated artifacts resulting from agent workflows.
- **`modules/`**: Contains modular AI instructions and optional system features (e.g., Knowledge Graph rules). 

## 3. Core Operations (Default Mode)

### A. Ingest Workflow
When a new source is added to `raw/`:
1. **Target Identification**: Identify the new source document.
2. **Context Extraction**: Extract key information, takeaways, and entities.
3. **Knowledge Synthesis**: Create or update relevant Markdown documentation in `wiki/`.
4. **Index Update**: Update `index.md` catalog with new pages.
5. **Logging**: Append an entry to `log.md`.

### B. Query Workflow
When asked a question:
1. **Search**: Consult `index.md` and search the `wiki/` directory.
2. **Execution**: Synthesize the answer from `wiki/` files.
3. **Knowledge Capture**: File valuable new insights back into `wiki/`.

### C. Lint Workflow
Periodically maintain the wiki's health by checking for contradictions, stale claims, or missing cross-references.

---

## 4. 🔌 Modules & Features
This system supports modular plug-and-play features to make the AI more efficient. 

**CRITICAL RULE FOR AI AGENTS ACROSS SESSIONS:**
At the start of any interaction, the Agent MUST check **`CONFIG.md`** to see which modules are currently enabled (marked with `[x]`). If a module is enabled, the agent MUST read its corresponding file in the `modules/` directory and strictly execute its rules during all Ingest, Query, and Lint workflows.
