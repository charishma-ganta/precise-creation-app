import { Link } from "@tanstack/react-router";
import { Brain, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/explainer", label: "Topic Explainer" },
  { to: "/quiz", label: "Quiz Generator" },
  { to: "/planner", label: "Study Planner" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl min-w-0 items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">StudyMate</p>
            <span className="font-display text-base font-semibold">AI</span>
          </div>
        </Link>

        <div className="hidden flex-1 min-w-0 flex-wrap items-center justify-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link"
              activeProps={{ className: "nav-link nav-link-active" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 md:inline-flex"
          >
            Get Started
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="navbar-toggle md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="max-w-[18rem]">
              <div className="flex items-center justify-between gap-3 pb-4">
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                    <Brain className="h-5 w-5" />
                  </div>
                  <span className="font-display text-base font-semibold">StudyMate AI</span>
                </Link>
                <SheetClose asChild>
                  <button
                    type="button"
                    className="navbar-toggle"
                    aria-label="Close navigation menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </SheetClose>
              </div>

              <div className="space-y-2 py-2">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="nav-link-mobile"
                    activeProps={{ className: "nav-link-mobile bg-primary/10" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  to="/dashboard"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
                >
                  Get Started
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
