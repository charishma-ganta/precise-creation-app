# Library Code

This folder contains shared logic, server functions, and utilities.

## AI Server Functions

`ai.functions.ts`

The main backend for StudyMate AI. Exports three `createServerFn` endpoints:

| Function | Method | Input | Output |
|----------|--------|-------|--------|
| `explainTopic` | `POST` | `{ topic: string }` | `{ content: string, error: string }` |
| `generateQuiz` | `POST` | `{ topic: string }` | `{ questions: [...], error: string }` |
| `generatePlan` | `POST` | `{ subject, days, hours, goal }` | `{ content: string, error: string }` |

All functions call the Lovable AI Gateway (`google/gemini-2.5-flash`) with structured prompts and return results to the client.

### Error Handling

- Missing `GEMINI_API_KEY` is reported as a clear configuration error.
- 429 / 5xx responses trigger exponential backoff retries.
- 402 (insufficient credits) and final failures return user-friendly error messages.

### Response Normalization

`generateQuiz` normalizes AI output: if the model returns a bare JSON array, it is wrapped into `{ questions: [...] }` before Zod validation.

## Utilities

- `utils.ts` — Common helpers such as `cn()` for conditional class merging.
- `error-capture.ts` / `lovable-error-reporting.ts` — Error tracking helpers used by the app.

## Adding a Server Function

1. Create a new `*.functions.ts` file (or add to `ai.functions.ts`).
2. Use `createServerFn` from `@tanstack/react-start`.
3. Validate input with Zod.
4. Call the AI gateway or database inside the handler.
5. Import the function from a route component and call it via `useServerFn`.
