# Project Context

React + TypeScript app. Vite. No class components.

# Stack

- React 18, TypeScript 5, Vite
- Styling: Tailwind CSS
- Testing: Vitest + React Testing Library

# Conventions

- Components in src/components/, one file per component
- Custom hooks in src/hooks/
- Types co-located with their component unless shared (then src/types/)
- Prefer named exports

# What Not to Touch

- Don't modify vite.config.ts without asking
- Don't add new dependencies without confirming

# Commands

- `npm run dev` — start dev server
- `npm run test` — run tests
- `npm run lint` — ESLint
