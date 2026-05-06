import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchData } from "../services/fetchData.js";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/meals")({
  component: RouteComponent,
});

function RouteComponent() {
  const [values, setValues] = useState({
    url: "https://api.freeapi.app/api/v1/public/meals",
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
    <section className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Meals Collection
        </h1>

        <p className="mt-2 text-slate-400">
          Explore delicious cuisines and recipes from around the world.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-2">
        {data.data.map((meal) => (
          <article
            key={meal.idMeal}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40"
          >
            <div className="overflow-hidden">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="space-y-5 p-6">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-medium text-indigo-300">
                    {meal.strArea}
                  </span>

                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                    {meal.strCategory}
                  </span>
                </div>

                <h2 className="line-clamp-1 text-2xl font-bold text-white">
                  {meal.strMeal}
                </h2>

                <p className="mt-3 line-clamp-3 leading-7 text-slate-400">
                  {meal.strInstructions}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <Link
                  to={`/meal/${meal.id}`}
                  params={{ mealId: meal.id }}
                  className="rounded-xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-400"
                >
                  View Details
                </Link>

                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-slate-400 transition hover:text-white"
                >
                  Recipe Source →
                </a>
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
