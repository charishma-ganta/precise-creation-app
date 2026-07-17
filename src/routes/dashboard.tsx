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
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="animate-fade-up">
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Welcome to your <span className="gradient-text">workspace</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Pick a tool to get started. Everything is powered by AI to save you time.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tools.map((t, i) => (
            <Link
              key={t.to}
              to={t.to}
              className="group glass-card rounded-2xl p-7 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <t.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
