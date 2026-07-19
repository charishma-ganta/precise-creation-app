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
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 md:grid-cols-2 md:gap-16 md:py-20 lg:px-6">
          <div className="animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Powered by AI
            </div>
            <h1 className="hero-title">
              Learn Smarter <br />
              with <span className="gradient-text">AI</span>
            </h1>
            <p className="hero-subtitle">
              Personal AI that explains concepts, creates quizzes, and builds study plans—fast and friendly.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                to="/dashboard"
                className="btn-primary hover:btn-primary-hover px-6 py-3 text-base shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 w-full max-w-[18rem] sm:w-auto justify-center"
                aria-label="Get started with StudyMate AI"
                title="Get started"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground underline-offset-2">
                Learn More
              </a>
            </div>

            {/* Micro commitment to increase click-through */}
            <div className="mt-3 text-sm text-muted-foreground">No credit card • 1-minute setup</div>

            {/* Trust / social proof row (minimal) */}
            <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center">
              <div className="inline-flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span>Trusted by 20k+ students</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Quick setup</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>AI-powered guidance</span>
              </div>
            </div>
          </div>
          <div className="animate-fade-up [animation-delay:80ms]">
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
              <div className="absolute inset-0 z-0 rounded-3xl bg-gradient-to-tr from-transparent to-black/5 pointer-events-none" />
              <img
                src={heroImg}
                alt="Student learning with AI assistant"
                className="w-full max-w-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold">Everything you need to study</h2>
          <p className="mt-3 text-muted-foreground">
            Four powerful tools built for the way students actually learn.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card rounded-2xl p-7 transition-transform hover:-translate-y-2 hover:shadow-[0_18px_50px_-20px_var(--color-primary)] animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_6px_24px_-8px_var(--color-primary)]">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-1 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-secondary/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl p-8 text-center text-primary-foreground [background:var(--gradient-hero)] shadow-[var(--shadow-soft)] sm:p-12">
          <h2 className="font-display text-4xl font-bold text-white">Ready to Study Smarter?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Jump into your dashboard and let StudyMate AI help you understand, practice and plan.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Start Learning <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border bg-card/80">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-muted-foreground md:grid-cols-[1.5fr_auto] md:items-center sm:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/90">StudyMate AI</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground/90">
              A smarter, more focused way to study. Use AI tools to learn clearly, practice confidently, and plan effectively.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-4 md:justify-end">
            <Link to="/" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              Home
            </Link>
            <a href="#features" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              Features
            </a>
            <a href="mailto:hello@studymate.ai" className="text-sm font-medium text-muted-foreground transition hover:text-foreground">
              Contact
            </a>
            <span className="text-sm font-medium text-muted-foreground">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
