import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AiMarkdown } from "@/components/AiMarkdown";
import { explainTopic } from "@/lib/ai.functions";
import { Brain, Copy, Eraser, Loader2, Sparkles } from "lucide-react";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/explainer")({
  head: () => ({
    meta: [
      { title: "AI Topic Explainer – StudyMate AI" },
      { name: "description", content: "Explain any topic with beginner-friendly AI breakdowns." },
    ],
  }),
  component: Explainer,
});

function Explainer() {
  const explain = useServerFn(explainTopic);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast.error("Please enter a topic first.");
      return;
    }
    setLoading(true);
    setAnswer("");
    try {
      const res = await explain({ data: { topic: topic.trim() } });
      setAnswer(res.content);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-center" />
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="animate-fade-up">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Brain className="h-3.5 w-3.5" /> Topic Explainer
          </div>
          <h1 className="font-display text-4xl font-bold">Explain anything, simply.</h1>
          <p className="mt-2 text-muted-foreground">
            Type a concept — get a beginner-friendly breakdown with examples and tips.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 glass-card rounded-2xl p-4 flex flex-col gap-3 sm:flex-row"
        >
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. React Hooks, Binary Search, Photosynthesis"
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary hover:btn-primary-hover disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Explaining..." : "Explain"}
          </button>
        </form>

        {loading && (
          <div className="mt-8 glass-card animate-pulse rounded-2xl p-8 text-center text-muted-foreground">
            StudyMate AI is thinking...
          </div>
        )}

        {answer && !loading && (
          <div className="mt-8 glass-card rounded-2xl p-8 animate-fade-up">
            <div className="mb-4 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(answer);
                  toast.success("Copied to clipboard");
                }}
                className="btn-ghost hover:bg-secondary text-sm"
              >
                <Copy className="h-4 w-4" /> Copy Response
              </button>
              <button
                onClick={() => {
                  setAnswer("");
                  setTopic("");
                }}
                className="btn-ghost hover:bg-secondary text-sm"
              >
                <Eraser className="h-4 w-4" /> Clear
              </button>
            </div>
            <AiMarkdown text={answer} />
          </div>
        )}
      </main>
    </div>
  );
}
