import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AiMarkdown } from "@/components/AiMarkdown";
import { generatePlan } from "@/lib/ai.functions";
import { ArrowLeft, Calendar, Copy, Loader2, Sparkles } from "lucide-react";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Study Planner – StudyMate AI" },
      { name: "description", content: "Generate personalized day-by-day study plans with AI." },
    ],
  }),
  component: Planner,
});

function Planner() {
  const plan = useServerFn(generatePlan);
  const [subject, setSubject] = useState("");
  const [days, setDays] = useState(10);
  const [hours, setHours] = useState(3);
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !goal.trim()) {
      toast.error("Please fill in subject and goal.");
      return;
    }
    setLoading(true);
    setAnswer("");
    try {
      const res = await plan({ data: { subject: subject.trim(), days, hours, goal: goal.trim() } });
      if (res.error) {
        toast.error(res.error);
        return;
      }
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
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <div className="animate-fade-up">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Calendar className="h-3.5 w-3.5" /> Study Planner
          </div>
          <h1 className="font-display text-4xl font-bold">Plan your path to success.</h1>
          <p className="mt-2 text-muted-foreground">
            Tell us your subject, deadline, and goal — we'll design a study plan that fits.
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 glass-card rounded-3xl p-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2 grid gap-2">
            <label htmlFor="subject" className="text-sm font-medium text-foreground">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Operating Systems"
              aria-required="true"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">What subject are you preparing for?</p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="days" className="text-sm font-medium text-foreground">
              Days until exam
            </label>
            <input
              id="days"
              name="days"
              type="number"
              min={1}
              max={365}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              disabled={loading}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="hours" className="text-sm font-medium text-foreground">
              Hours per day
            </label>
            <input
              id="hours"
              name="hours"
              type="number"
              step="0.5"
              min={0.5}
              max={24}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              disabled={loading}
            />
          </div>
          <div className="sm:col-span-2 grid gap-2">
            <label htmlFor="goal" className="text-sm font-medium text-foreground">
              Goal
            </label>
            <input
              id="goal"
              name="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Score above 90%"
              aria-required="true"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">Add a study goal to shape the plan's focus.</p>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary hover:btn-primary-hover w-full justify-center rounded-2xl py-3 text-base font-semibold disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? "Building plan..." : "Generate Study Plan"}
            </button>
          </div>
        </form>

        {loading && (
          <div className="mt-8 glass-card animate-pulse rounded-2xl p-8 text-center text-muted-foreground">
            Designing your personalized plan...
          </div>
        )}

        {answer && !loading && (
          <div className="mt-8 glass-card rounded-2xl p-8 animate-fade-up">
            <div className="mb-4 flex items-center justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(answer);
                  toast.success("Copied to clipboard");
                }}
                className="btn-ghost hover:bg-secondary text-sm"
              >
                <Copy className="h-4 w-4" /> Copy Plan
              </button>
            </div>
            <AiMarkdown text={answer} />
          </div>
        )}
      </main>
    </div>
  );
}
