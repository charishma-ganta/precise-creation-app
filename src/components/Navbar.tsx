import { Link } from "@tanstack/react-router";
import { Brain } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/explainer", label: "Topic Explainer" },
  { to: "/quiz", label: "Quiz Generator" },
  { to: "/planner", label: "Study Planner" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-x-0 rounded-none">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Brain className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold">StudyMate AI</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-primary bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link to="/dashboard" className="btn-primary hover:btn-primary-hover text-sm">
          Get Started
        </Link>
      </nav>
    </header>
  );
}
