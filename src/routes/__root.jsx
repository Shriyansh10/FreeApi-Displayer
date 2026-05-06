import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const navLinks = [
  {
    to: "/random-cat",
    label: "Random Cat",
  },
  {
    to: "/jokes",
    label: "Jokes",
  },
  {
    to: "/meals",
    label: "Meals",
  },
  {
    to: "/products",
    label: "Products",
  },
  {
    to: "/quotes",
    label: "Quotes",
  },
  {
    to: "/users",
    label: "Users",
  },
  {
    to: "/videos",
    label: "Videos",
  },
];

function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              FreeApi Displayer
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Public APIs with modern UI
            </p>
          </div>

          <a
            href="https://freeapi.hashnode.space"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/20 sm:block"
          >
            API Docs
          </a>
        </div>

        <nav className="mx-auto flex max-w-7xl flex-wrap gap-3 px-4 pb-5 sm:px-6 lg:px-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{
                className: "bg-indigo-500/20 border-indigo-500 text-white",
              }}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});