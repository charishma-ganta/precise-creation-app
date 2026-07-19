# StudyMate AI

Your personal AI-powered study companion. StudyMate AI explains complex topics, generates multiple-choice quizzes, and builds personalized study plans — all in one clean, modern workspace.

![StudyMate AI](src/assets/hero-student.png)

## Features

- **AI Topic Explainer** — Enter any topic and get a beginner-friendly breakdown with key concepts, real-world examples, common mistakes, interview tips, and a summary.
- **AI Quiz Generator** — Generate 5 multiple-choice questions on any subject, complete with correct answers and explanations.
- **AI Study Planner** — Build a day-by-day study schedule based on your subject, exam date, available hours, and goal.
- **Modern UI** — Glass-morphism cards, smooth animations, responsive layout, and a cohesive indigo/blue design system.
- **SEO Ready** — Route-level meta titles and descriptions for every page.

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19 + Vite)
- **Styling:** Tailwind CSS v4 with custom design tokens and utilities
- **UI Primitives:** Radix UI components + shadcn/ui conventions
- **AI Backend:** Lovable AI Gateway (`google/gemini-2.5-flash`) via `createServerFn`
- **Icons:** Lucide React
- **Validation:** Zod
- **Language:** TypeScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- A Lovable Cloud project with an auto-provisioned `LOVABLE_API_KEY`

### Install dependencies

```bash
bun install
```

### Run the development server

```bash
bun run dev
```

The app will be available at `http://localhost:8080` by default.

### Environment variables

Create a `.env` file in the project root if needed:

```env
# Auto-provisioned by Lovable Cloud — no manual setup required in most cases.
LOVABLE_API_KEY=your_lovable_api_key
```

The server functions read `process.env.LOVABLE_API_KEY` at runtime. The key is never exposed to the browser.

## Project Structure

```text
src/
├── components/       # Reusable React components (Navbar, AiMarkdown)
├── lib/              # Server functions, utilities, and helpers
├── routes/           # TanStack Start file-based routes
├── assets/           # Images and static assets
├── styles.css        # Tailwind v4 theme, tokens, and custom utilities
├── router.tsx        # Router configuration
└── start.ts          # App entry / server middleware
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start the Vite dev server |
| `bun run build` | Build for production |
| `bun run build:dev` | Build in development mode |
| `bun run preview` | Preview the production build |
| `bun run lint` | Run ESLint |
| `bun run format` | Format code with Prettier |

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, and CTA |
| `/dashboard` | Tool selection dashboard |
| `/explainer` | AI Topic Explainer |
| `/quiz` | AI Quiz Generator |
| `/planner` | AI Study Planner |

## Customization

- **Colors & theme:** Edit CSS variables in `src/styles.css`.
- **AI prompts:** Update the system/user prompts in `src/lib/ai.functions.ts`.
- **Routes:** Add new `.tsx` files under `src/routes/`; TanStack Router will register them automatically.

## Deployment

This project is optimized for Lovable Cloud / edge deployment. Run `bun run build` to produce a production bundle, then publish through the Lovable dashboard.

---

Built with ❤️ using Lovable.
