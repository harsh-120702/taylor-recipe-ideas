# Recipe Ideas | Taylor’s Kitchen

A minimalist React app to help Taylor (a busy professional) quickly discover meal ideas from curated categories — fast, mobile-friendly, and pleasant to use. 🌮🍝🍜

## Project Overview
- Browse by category (e.g., Burgers, Pastas, Desserts) and view recipe ideas instantly.
- Save favourites for quick access and revisit your recent history.
- Light/Dark theme toggle 🌞/🌙 with persistent preference.
- Responsive 3‑pane layout: Left navigation, Center feed, Right panel (History + Favourites).

## Tech Stack
- React + Vite + TypeScript
- Tailwind CSS (class-based dark mode) for modern, minimalist UI
- Context API + localStorage for state persistence (history, favourites, theme)
- TheMealDB API (no auth) for category-based recipes

## Features
- Category navigation with active highlights and smooth visuals
- Main recipe feed with lazy-loaded thumbnails and subtle hover effects
- History panel: recent categories/meals; click to re-run
- Favourites panel: saved recipes with quick remove and click-to-view
- Theme toggle (persistent) and responsive design tailored for mobile/desktop

## Folder Structure
```text
src/
  components/
    layout/         # AppLayout root grid
    sidebar/        # SidebarNav, NavItem, ThemeToggle placement
    feed/           # MainFeed (center content)
    panels/         # RightPanel, HistoryPanel, FavoritesPanel
    theme/          # ThemeToggle
  services/
    mealApi.ts      # TheMealDB fetch helpers
  state/
    AppStateProvider.tsx  # Context: category, results, history, favourites
  storage/
    favorites.ts    # localStorage helpers for favourites
    history.ts      # localStorage helpers for history
```

## Setup Instructions
1. Install dependencies
```bash
npm install
```
2. Start the dev server
```bash
npm run dev
```
3. Build for production
```bash
npm run build
```

Live demo (StackBlitz/GitHub Pages)
- StackBlitz: https://stackblitz.com/github/harsh-120702/taylor-recipe-ideas
- GitHub Pages: https://harsh-120702.github.io/taylor-recipe-ideas/

## LLM Collaboration
This project was refined collaboratively with Warp (Agent Mode). The agent assisted with:
- Architecture planning (3‑pane layout, state context, storage utilities)
- Implementing category browsing, history/favourites persistence
- Visual polish with Tailwind (dark mode, spacing, rings, hover states)
- Deployment via GitHub Pages and documentation

## Credits
- Data: TheMealDB (https://www.themealdb.com)
- UI: Tailwind CSS
- Icons/emoji: Unicode
