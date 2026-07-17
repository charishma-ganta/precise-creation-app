import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MODEL = "gemini-2.5-flash";

type GatewayResult =
  | { ok: true; content: string }
  | { ok: false; error: string };

function formatGeminiError(status: number, body: string) {
  if (status === 429) {
    return "Gemini is rate-limiting requests on the free tier. Please wait a minute and try again, or upgrade your Gemini API plan.";
  }
  if (status === 403) {
    return "Gemini rejected the API key (403). Check that GEMINI_API_KEY is valid and has access to the Generative Language API.";
  }
  try {
    const parsed = JSON.parse(body) as { error?: { message?: string } };
    if (parsed.error?.message) return `Gemini error: ${parsed.error.message}`;
  } catch {
    // fall through
  }
  return `Gemini request failed (${status}). Please try again later.`;
}

async function callGateway(system: string, user: string) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return {
      ok: false,
      error: "GEMINI_API_KEY is not configured. Save your Gemini API key in project secrets first.",
    } satisfies GatewayResult;
  }
  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: system }] },
    contents: [{ role: "user", parts: [{ text: user }] }],
  });
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;
  const delays = [0, 1500, 4000, 8000];
  let lastErr = "";
  let lastStatus = 0;
  for (const wait of delays) {
    if (wait) await new Promise((r) => setTimeout(r, wait));
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    if (res.ok) {
      const data = await res.json();
      const content =
        data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
      return { ok: true, content } satisfies GatewayResult;
    }
    lastStatus = res.status;
    lastErr = await res.text();
    if (res.status !== 429 && res.status < 500) {
      return { ok: false, error: formatGeminiError(res.status, lastErr) } satisfies GatewayResult;
    }
  }
  return { ok: false, error: formatGeminiError(lastStatus || 429, lastErr) } satisfies GatewayResult;
}

export const explainTopic = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ topic: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const result = await callGateway(
      "You are StudyMate AI, a friendly tutor. Always respond in clean Markdown with the exact section headings requested.",
      `Explain the topic "${data.topic}" for a beginner. Use these exact markdown sections:

## Simple Explanation
A clear, beginner-friendly explanation in plain language.

## Key Concepts
- Bullet list of the main concepts.

## Real-World Example
A relatable example.

## Common Mistakes
- Bullet list of common pitfalls.

## Interview Tips
- 3-5 interview questions or tips.

## Summary
A concise 2-3 sentence recap.`,
    );
    if (!result.ok) return { content: "", error: result.error };
    return { content: result.content, error: "" };
  });

const QuizSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()).length(4),
      correctIndex: z.number().min(0).max(3),
      explanation: z.string(),
    }),
  ),
});

export const generateQuiz = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ topic: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const result = await callGateway(
      "You are StudyMate AI, a quiz generator. Always respond with pure JSON only, no markdown fences, no prose.",
      `Generate 5 multiple choice questions about "${data.topic}". Respond as a JSON object of shape:
{"questions":[{"question":"...","options":["a","b","c","d"],"correctIndex":0,"explanation":"..."}]}
Exactly 5 questions, each with exactly 4 options.`,
    );
    if (!result.ok) return { questions: [], error: result.error };
    const raw = result.content;
    const cleaned = raw.replace(/```json\s*|\s*```/g, "").trim();
    const parsed = QuizSchema.parse(JSON.parse(cleaned));
    return { ...parsed, error: "" };
  });

export const generatePlan = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({
        subject: z.string().min(1).max(200),
        days: z.number().int().min(1).max(365),
        hours: z.number().min(0.5).max(24),
        goal: z.string().min(1).max(300),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const result = await callGateway(
      "You are StudyMate AI, an expert study planner. Respond in clean Markdown with the exact section headings requested.",
      `Create a personalized study plan.
Subject: ${data.subject}
Days until exam: ${data.days}
Hours available per day: ${data.hours}
Goal: ${data.goal}

Use these exact markdown sections:

## Day-by-Day Schedule
A table or ordered list, one line per day, with the topics to cover that day.

## Revision Days
Which days should be dedicated to revision, and what to revise.

## Practice Day
Which day is for practice / mock tests, and how to structure it.

## Final Revision Checklist
- Bullet checklist for the last day.

## Motivation Tip
A short encouraging note.`,
    );
    if (!result.ok) return { content: "", error: result.error };
    return { content: result.content, error: "" };
  });
