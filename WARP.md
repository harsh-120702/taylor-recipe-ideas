# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- React + Vite + TypeScript app to search TheMealDB by ingredient and view meal details. See README.md for getting started basics.

Common commands
- Install deps
```bash path=null start=null
npm install
```
- Dev server
```bash path=null start=null
npm run dev
```
- Build (type-checks via tsc then bundles)
```bash path=null start=null
npm run build
```
- Preview production build
```bash path=null start=null
npm run preview
```
- Lint all files
```bash path=null start=null
npm run lint
```
- Lint with auto-fix (ad-hoc)
```bash path=null start=null
npm run lint -- --fix
```
- Test (Vitest + jsdom)
```bash path=null start=null
npm run test
```
- Run a single test file
```bash path=null start=null
npm run test -- src/App.test.tsx
```
- Run tests matching a name/pattern
```bash path=null start=null
npm run test -- -t "renders search controls"
```

Architecture and structure
- Runtime stack
  - Vite app with React plugin (vite.config.ts). Entry at src/main.tsx renders App into #root.
  - TypeScript project references split: tsconfig.app.json for app code, tsconfig.node.json for config/build scripts. Build runs tsc -b followed by Vite.
- UI composition (src/)
  - App.tsx is the main feature component. Local state via React hooks: ingredient, mood, time, meals list, selection, loading/error. Derives a status header via useMemo. Renders:
    - Controls: text input (ingredient), two selects (mood/time), and a Search button.
    - Grid of result cards; selecting a card triggers details fetch and highlights active card.
    - Details panel for the selected meal with image, truncated instructions, and links (YouTube/Source) when available.
  - Styling via App.css and index.css; assets under src/assets, static under public/.
- Data layer
  - src/services/mealApi.ts encapsulates all network I/O to TheMealDB:
    - filterByIngredient(ingredient) → Promise<MealListItem[]> using /filter.php?i=...
    - getMealDetails(id) → Promise<MealDetail|null> using /lookup.php?i=...
  - Errors: non-2xx responses throw; App.tsx catches and sets user-visible error state.
- Testing
  - Vitest configured in vitest.config.ts with jsdom environment and @vitejs/plugin-react.
  - Global test setup in vitest.setup.ts enables @testing-library/jest-dom matchers.
  - Tests colocated with source (e.g., src/App.test.tsx) using @testing-library/react.
- Linting
  - eslint.config.js uses ESLint flat config with:
    - @eslint/js recommended, typescript-eslint recommended, react-hooks recommended-latest, react-refresh (Vite) rules.
    - Globals set for browser; dist ignored.

Notes from README.md
- Purpose: quickly find meal ideas by available ingredients; mobile- and desktop-friendly.
- API: TheMealDB (no auth). Filtering by ingredient; mood/time are client-side hints only today.
- Error states handled for network issues/no results. Future ideas include richer filters and favorites.
