# Data layer

Data sources (static portfolio data, theme storage) and repository implementations of the
domain contracts. Maps raw data to domain entities before returning them.

- MAY import: `domain/`, other files in `data/`.
- MUST NOT import: `presentation/`.
- Browser storage is accessed only through an injected storage adapter.
