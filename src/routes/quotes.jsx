import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchData } from "../services/fetchData.js";

export const Route = createFileRoute("/quotes")({
  component: RouteComponent,
});

function RouteComponent() {
  const [values, setValues] = useState({
    url: "https://api.freeapi.app/api/v1/public/quotes",
    page: 1,
    limit: 10,
    method: "GET",
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const handleFetch = async () => {
      const res = await fetchData(
        values.url,
        values.page,
        values.limit,
        values.method,
        controller,
      );
      return res;
    };
    handleFetch()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log("Data fetching error: ", err));

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.page]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
      </div>
    );
  }
  return (
    <section className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Inspirational Quotes
        </h1>

        <p className="mt-2 text-slate-400">
          Explore timeless thoughts and wisdom from different authors.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {data.data.map((quote, index) => (
          <article
            key={quote.id}
            className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 flex flex-col"
          >
            <div className="flex-1">
              <div className="text-5xl leading-none text-indigo-400">“</div>

              <p className="text-lg leading-8 ml-4 text-slate-200">
                {quote.content}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 items-left justify-between border-t border-white/10 pt-5">
              <div>
                <p className="text-lg font-semibold text-white">
                  {quote.author}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Quote #{index + 1}
                </p>
              </div>
              <div className="flex gap-1">
                {quote.tags.map((tag) => (
                  <div
                    key={tag}
                    className="rounded-full bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={() =>
            setValues({
              ...values,
              page: Math.max(1, values.page - 1),
            })
          }
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous Page
        </button>

        <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-300">
          Page {data.page} / {data.totalPages}
        </div>

        <button
          onClick={() =>
            setValues({
              ...values,
              page: Math.min(data.totalPages, values.page + 1),
            })
          }
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-500/20"
        >
          Next Page
        </button>
      </div>
    </section>
  );
}
