# Components

Reusable React components used throughout StudyMate AI.

## Navbar

`Navbar.tsx`

Sticky glass-morphism navigation bar with the StudyMate AI logo and links to all main routes.

- Uses `Link` from `@tanstack/react-router` for type-safe navigation.
- Responsive: full nav on desktop, compact CTA on mobile.
- Active route styling via `activeProps`.

## AiMarkdown

`AiMarkdown.tsx`

A lightweight Markdown renderer designed specifically for AI-generated study content.

Supports:

- Headings (`#`, `##`, `###`)
- Bullet lists (`-` or `*`)
- Bold (`**text**`), italic (`*text*`), and inline code (`` `code` ``)
- Paragraphs with relaxed line-height

Used by:

- `src/routes/explainer.tsx`
- `src/routes/planner.tsx`

## Adding a New Component

1. Create a new `.tsx` file in this folder.
2. Import it from the route or component that needs it.
3. Keep components focused and reuse Tailwind design tokens from `src/styles.css`.
