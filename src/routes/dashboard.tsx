import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Brain, Sparkles, Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard – StudyMate AI" },
      { name: "description", content: "Access AI Topic Explainer, Quiz Generator and Study Planner." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/explainer" as const,
    icon: Brain,
    title: "AI Topic Explainer",
    desc: "Enter any topic and get a beginner-friendly breakdown with examples and interview tips.",
  },
  {
    to: "/quiz" as const,
    icon: Sparkles,
    title: "Quiz Generator",
    desc: "Instantly generate 5 MCQs on any subject with answers and explanations.",
  },
  {
    to: "/planner" as const,
    icon: Calendar,
    title: "Study Planner",
    desc: "Get a personalized day-by-day study schedule tailored to your exam and goals.",
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
              StudyMate AI Dashboard
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Your learning hub for faster, smarter study sessions.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              Access AI-powered tools for topic explanation, quiz generation, and personalized study planning—all from one polished workspace.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-border bg-card p-4 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Tools</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">3</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-4 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Ready in</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">Instant</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-4 text-center shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Focus</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">Clarity</p>
              </div>
            </div>
          </div>

          <div className="animate-fade-up rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Next step</p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">Pick the best tool for your study goal</h2>
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-sm">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
              <p>Choose the tool that matches how you want to learn today:</p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>Use Topic Explainer to break down difficult concepts.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>Generate a quiz to test knowledge retention.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>Build a study plan when you're preparing for an exam.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <div className="grid gap-6 md:grid-cols-3">
            {tools.map((t, i) => (
              <Link
                key={t.to}
                to={t.to}
                className="group glass-card rounded-3xl p-7 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
                  <t.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-foreground">{t.title}</h3>
                  <span className="rounded-full bg-secondary/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-secondary-foreground">
                    Start
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{t.desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
