# Project Context

React + TypeScript app. Vite. No class components.

# Workflow

- Work in slices — one feature at a time, end to end
- Follow TDD: write tests before implementation
- Always wait for explicit approval before implementing after writing tests
- Each change must touch only the file(s) explicitly specified — no drive-by edits
- Read docs/PRD.md and CLAUDE.md before starting any new slice
- Surface ambiguity and get a decision before touching integration points (e.g. App.tsx, wiring components together)

# Stack

- React 18, TypeScript 5, Vite
- Styling: Tailwind CSS
- Testing: Vitest + React Testing Library

# Conventions

- Components in src/components/, one file per component
- Custom hooks in src/hooks/
- Types co-located with their component unless shared (then src/types/)
- Prefer named exports

# Card Movement

Cards support two movement mechanisms:
- **Drag-and-drop** — HTML5 native DnD (no library); `Column` acts as a drop target, `Card` is draggable
- **Button-based** — ← → arrow buttons on each card to move left/right one column

Both must stay in sync — moving a card via either method produces the same state update.

# What Not to Touch

- Don't modify vite.config.ts without asking
- Don't add new dependencies without confirming
- When installing or switching Node versions, add or update .nvmrc to match

# Commands

- `npm run dev` — start dev server
- `npm run test` — run tests
- `npm run lint` — ESLint
