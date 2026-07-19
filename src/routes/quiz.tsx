import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { generateQuiz } from "@/lib/ai.functions";
import { ArrowLeft, CheckCircle2, Loader2, Sparkles, XCircle } from "lucide-react";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "AI Quiz Generator – StudyMate AI" },
      { name: "description", content: "Generate instant multiple-choice quizzes on any topic." },
    ],
  }),
  component: Quiz,
});

type QuizData = Awaited<ReturnType<typeof generateQuiz>>;

function Quiz() {
  const genQuiz = useServerFn(generateQuiz);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [picks, setPicks] = useState<Record<number, number>>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast.error("Please enter a topic first.");
      return;
    }
    setLoading(true);
    setQuiz(null);
    setPicks({});
    try {
      const res = await genQuiz({ data: { topic: topic.trim() } });
      if (res.error) {
        toast.error(res.error);
        return;
      }
      setQuiz(res);
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
        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <div className="animate-fade-up">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Quiz Generator
          </div>
          <h1 className="font-display text-4xl font-bold">Test what you know.</h1>
          <p className="mt-2 text-muted-foreground">
            Enter a topic and get 5 MCQs with answers and explanations.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 glass-card rounded-3xl p-6 grid gap-4"
        >
          <div className="grid gap-2">
            <label htmlFor="quiz-topic" className="text-sm font-medium text-foreground">
              Quiz topic
            </label>
            <input
              id="quiz-topic"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. JavaScript, DBMS, World History"
              aria-required="true"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">Enter a topic for a quick multiple-choice quiz.</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary hover:btn-primary-hover disabled:opacity-70 disabled:pointer-events-none w-full justify-center rounded-2xl py-3 text-base font-semibold"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Generating..." : "Generate Quiz"}
          </button>
        </form>

        {loading && (
          <div className="mt-8 glass-card animate-pulse rounded-2xl p-8 text-center text-muted-foreground">
            Crafting your quiz...
          </div>
        )}

        {quiz && (
          <div className="mt-8 space-y-5">
            {quiz.questions.map((q, i) => {
              const picked = picks[i];
              return (
                <div key={i} className="glass-card rounded-2xl p-6 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="mb-3 flex items-start gap-3">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-semibold">{q.question}</h3>
                  </div>
                  <div className="mt-4 grid gap-2">
                    {q.options.map((opt, oi) => {
                      const isPicked = picked === oi;
                      const isCorrect = q.correctIndex === oi;
                      const showResult = picked !== undefined;
                      let cls = "border-border bg-card hover:bg-secondary";
                      if (showResult && isCorrect) cls = "border-green-500 bg-green-500/10";
                      else if (showResult && isPicked && !isCorrect) cls = "border-destructive bg-destructive/10";
                      return (
                        <button
                          key={oi}
                          onClick={() => setPicks((p) => ({ ...p, [i]: oi }))}
                          disabled={picked !== undefined}
                          className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${cls}`}
                        >
                          <span>{opt}</span>
                          {showResult && isCorrect && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                          {showResult && isPicked && !isCorrect && <XCircle className="h-4 w-4 text-destructive" />}
                        </button>
                      );
                    })}
                  </div>
                  {picked !== undefined && (
                    <div className="mt-4 rounded-xl bg-secondary/60 p-4 text-sm">
                      <strong className="text-primary">Explanation:</strong>{" "}
                      <span className="text-foreground/90">{q.explanation}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
