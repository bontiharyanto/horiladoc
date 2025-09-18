# AI untuk Knowledge Management Horilla

Pipeline untuk mengubah kebijakan HR, SOP, panduan user/admin menjadi basis pengetahuan yang dapat dicari & dijawab AI.

_Terakhir diperbarui: 2025-09-18_

## Sumber Knowledge
- Folder **Docs** Horilla (MD/HTML)
- Lampiran Helpdesk (PDF/Doc)
- Kebijakan HR (PDF)

```mermaid
flowchart LR
  A[Ingest File/URL] --> B[Split & Clean]
  B --> C[Embeddings]
  C --> D[(Vector DB)]
  D --> E{Indexing Done?}
  E -->|Ya| F[Serve RAG]
  E -->|Tidak| B
```

## API
- `POST /api/knowledge/ingest`
- `GET /api/knowledge/search?q=...`
- `POST /api/knowledge/reindex`
