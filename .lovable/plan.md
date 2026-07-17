## Goal
Add a visible "Back" navigation button on the three AI tool pages (Explainer, Quiz, Planner) so users can return to the Dashboard easily.

## Changes
In each of `src/routes/explainer.tsx`, `src/routes/quiz.tsx`, and `src/routes/planner.tsx`:

- Add a `<Link to="/dashboard">` button at the top of the `<main>` container (above the page heading).
- Style it as a subtle ghost button with an `ArrowLeft` icon from `lucide-react` and the label "Back to Dashboard".
- Import `Link` from `@tanstack/react-router` and `ArrowLeft` from `lucide-react` in each file.

No changes to business logic, AI functions, or the Navbar.
