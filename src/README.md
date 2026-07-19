# Source Overview

This folder contains the full StudyMate AI application source.

## Folders

| Folder | Purpose |
|--------|---------|
| `components/` | Reusable React components used across routes. |
| `lib/` | Server functions, validation schemas, utilities, and error handling. |
| `routes/` | TanStack Start file-based routes. Each file maps to a URL. |
| `assets/` | Static images and other assets. |

## Key Files

| File | Purpose |
|------|---------|
| `styles.css` | Tailwind v4 theme variables, custom utilities (`glass-card`, `btn-primary`, `gradient-text`), and animations. |
| `router.tsx` | TanStack Router configuration. |
| `start.ts` | Application entry point and server middleware setup. |
| `routes/__root.tsx` | Root layout that wraps every page (shell, providers, SEO defaults). |

## Conventions

- Routes are file-based. `src/routes/index.tsx` is `/`, `src/routes/dashboard.tsx` is `/dashboard`, etc.
- Server functions live in `src/lib/*.functions.ts` and are called from route components with `useServerFn`.
- Components should use Tailwind semantic tokens (e.g. `bg-background`, `text-foreground`) instead of hardcoded colors so dark mode works correctly.
