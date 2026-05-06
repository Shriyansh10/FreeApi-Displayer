import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 text-white">
      <section className="max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-indigo-400">
          Welcome
        </p>

        <h1 className="text-5xl font-bold leading-tight">
          Hi, I&apos;m Shriyansh Agarwal
        </h1>

        <p className="mt-4 text-xl text-slate-300">Fullstack Developer</p>

        <p className="mt-8 text-lg leading-relaxed text-slate-400">
          This project is a collection of multiple mini-projects built inside a
          single application while exploring TanStack Router and modern React
          development patterns.
        </p>

        <div className="mt-10 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-6 py-4 text-base text-indigo-200">
          Choose any tab to view a project.
        </div>
      </section>
    </main>
  );
}
