import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Brain, Calendar, Sparkles, Zap, Clock, User, Wifi, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import heroImg from "@/assets/hero-student.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudyMate AI – Personal AI Student Companion" },
      {
        name: "description",
        content:
          "Learn smarter with AI. StudyMate AI explains concepts, generates quizzes, and builds personalized study plans in one beautiful workspace.",
      },
      { property: "og:title", content: "StudyMate AI – Personal AI Student Companion" },
      {
        property: "og:description",
        content: "Learn smarter with AI. StudyMate AI explains concepts, generates quizzes, and builds personalized study plans in one beautiful workspace.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Brain, title: "AI Topic Explainer", desc: "Understand any concept in simple, friendly language." },
  { icon: Sparkles, title: "Quiz Generator", desc: "Generate instant MCQs to test your understanding." },
  { icon: Calendar, title: "Study Planner", desc: "Create personalized study schedules that fit your time." },
  { icon: Zap, title: "Fast Learning", desc: "Learn faster with AI-powered guidance and structure." },
];

const why = [
  { icon: Clock, title: "Saves Time", desc: "Everything in one place — no more tab switching." },
  { icon: User, title: "Personalized Learning", desc: "Content adapts to your subject, level and goals." },
  { icon: BookOpen, title: "Beginner Friendly", desc: "Explanations designed for learners of all levels." },
  { icon: Wifi, title: "Available Anytime", desc: "Study whenever inspiration strikes, 24/7." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_oklch(0.9_0.08_275/0.4),_transparent_60%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Powered by AI
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-6xl">
              Learn Smarter <br />
              with <span className="gradient-text">AI</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Your personal AI-powered study companion that explains concepts, creates quizzes, and
              builds personalized study plans — all in one beautiful workspace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className="btn-primary hover:btn-primary-hover">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#features" className="btn-ghost hover:bg-secondary">
                Learn More
              </a>
            </div>
          </div>
          <div className="animate-fade-up [animation-delay:150ms]">
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
              <img
                src={heroImg}
                alt="Student learning with AI assistant"
                className="w-full max-w-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold">Everything you need to study</h2>
          <p className="mt-3 text-muted-foreground">
            Four powerful tools built for the way students actually learn.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold">Why Choose StudyMate AI</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <div key={w.title} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
                <w.icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">{w.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl p-12 text-center text-primary-foreground [background:var(--gradient-hero)] shadow-[var(--shadow-soft)]">
          <h2 className="font-display text-4xl font-bold text-white">Ready to Study Smarter?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Jump into your dashboard and let StudyMate AI help you understand, practice and plan.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary transition-transform hover:-translate-y-0.5"
          >
            Start Learning <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} StudyMate AI</div>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="mailto:hello@studymate.ai" className="hover:text-foreground">Contact</a>
            <span>Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
