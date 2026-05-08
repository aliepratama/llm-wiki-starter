# LLM Wiki Agent System

This repository follows a knowledge curation structure inspired by the LLM wiki approach. It is designed to act as a centralized, persistent knowledge base and operational schema for managing evolving information across any domain (e.g., Personal, Research, Projects, or Business).

## 1. What the Wiki Covers
This wiki captures and synthesizes information from various raw sources into a structured, compounding knowledge base. Instead of re-deriving answers from scratch, it maintains cross-references, topic summaries, and entity pages that grow richer over time.

## 2. Directory Rules
- **`raw/`**: Stores unstructured data and raw exports. 
  - Save source documents, raw JSON dumps, transcripts, articles, images, or metadata here.
  - These files are *immutable* — they are read but never modified. This is the source of truth.
- **`wiki/`**: The structured markdown brain of the wiki.
  - Synthesizes information from `raw/` into readable, cross-linked Markdown files.
  - Maintains domain-specific structures (e.g., `wiki/concepts/`, `wiki/entities/`).
  - The AI owns this layer entirely: creating, updating, and cross-referencing pages.
- **`outputs/`**: Generated artifacts resulting from agent workflows.
  - Holds synthesized outputs like generated code, presentations, or compiled reports.

## 3. Core Operations

### A. Ingest Workflow
When a new source is added to `raw/`, the data must be ingested:
1. **Target Identification**: Identify the new source document or data in the `raw/` folder.
2. **Context Extraction**: Read and extract key information, takeaways, and entities from the source.
3. **Knowledge Synthesis**: Create or update relevant Markdown documentation in `wiki/`. Integrate the new knowledge, update existing summaries, and add cross-references.
4. **Index Update**: Update the `index.md` catalog with the new or modified pages, including links and one-line summaries.
5. **Logging**: Append an entry to `log.md` using the chronological date-tagged format `## [YYYY-MM-DD] <activity> | <Description>`. Always include a brief description of the content or changes made beneath the header.

### B. Query Workflow
When asked a question or tasked with a synthesis:
1. **Search**: Consult `index.md` and search the `wiki/` directory to find relevant pages and established context.
2. **Gap Analysis**: If the wiki lacks sufficient detail, suggest new sources to ingest or extract more context from `raw/`.
3. **Execution**: Synthesize the answer, generate the requested artifact, or provide citations based on the stored knowledge.
4. **Knowledge Capture**: If the answer produces a valuable new synthesis, comparison, or insight, file it back into the `wiki/` as a new page.

### C. Lint Workflow
Periodically maintain the wiki's health:
1. **Review**: Check for contradictions, stale claims, orphan pages without inbound links, or missing cross-references.
2. **Refine**: Suggest updates, flag data gaps, and prompt for new sources to investigate.

## 4. Indexing and Logging
- **`index.md`**: A content-oriented catalog of everything in the wiki. Every page is listed with a link and a brief summary.
- **`log.md`**: A chronological, append-only record of wiki events (ingest, queries, linting).
