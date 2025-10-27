# Taylor Recipe Ideas

A simple React + TypeScript app for Taylor (a busy professional) to quickly find meal ideas using what he has on hand.

- Public API: TheMealDB (no auth) — filter by ingredient and view meal details.
- Tech: React + Vite + TS, minimal CSS. Works on desktop and mobile.

## Getting started

- Install dependencies:

```bash
npm install
```

- Start dev server:

```bash
npm run dev
```

- Build for production:

```bash
npm run build
```

## Usage

1. Enter one or more ingredients (e.g., "chicken", "rice").
2. Optionally select mood/time to guide ideas.
3. Click a meal card to see details and links to source/YouTube.

## Notes

- Error states are handled (network issues or no results).
- Filters are lightweight hints; TheMealDB filtering is by ingredient only.
- Future ideas: richer filtering, saving favorites, AI-powered suggestions.
