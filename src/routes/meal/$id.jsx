import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchData } from "../../services/fetchData.js";

export const Route = createFileRoute("/meal/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/meal/$id" });

  const [values] = useState({
    url: `https://api.freeapi.app/api/v1/public/meals/${id}`,
    page: null,
    limit: null,
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
  });

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl space-y-10">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 shadow-2xl backdrop-blur-xl">
        <div className="grid lg:grid-cols-2">
          <div className="overflow-hidden">
            <img
              src={data.strMealThumb}
              alt={data.strMeal}
              className="h-full min-h-[400px] w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            <div>
              <div className="mb-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-indigo-500/15 px-4 py-2 text-sm font-medium text-indigo-300">
                  {data.strArea}
                </span>

                <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-300">
                  {data.strCategory}
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white">
                {data.strMeal}
              </h1>

              <p className="mt-5 leading-8 text-slate-300">
                {data.strInstructions.slice(0, 220)}...
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Cuisine</p>

                <h3 className="mt-2 text-lg font-semibold text-white">
                  {data.strArea}
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Category</p>

                <h3 className="mt-2 text-lg font-semibold text-white">
                  {data.strCategory}
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={data.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-red-500 px-6 py-4 font-medium text-white transition hover:bg-red-400"
              >
                Watch Recipe
              </a>

              <a
                href={data.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-medium text-white transition hover:border-indigo-400 hover:bg-indigo-500/20"
              >
                View Source
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[400px_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-xl backdrop-blur-xl">
          <h2 className="mb-6 text-3xl font-bold text-white">Ingredients</h2>

          <ul className="space-y-4">
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
              const ingredient = data[`strIngredient${num}`];
              const measure = data[`strMeasure${num}`];

              return (
                ingredient && (
                  <li
                    key={num}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <span className="font-medium text-white">{ingredient}</span>

                    <span className="text-sm text-slate-400">{measure}</span>
                  </li>
                )
              );
            })}
          </ul>
        </div>

        <div className="space-y-8">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 shadow-xl backdrop-blur-xl">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={data.strYoutube.replace("watch?v=", "embed/")}
                title={data.strMeal}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-xl backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-bold text-white">Instructions</h2>

            <div className="space-y-5 leading-8 text-slate-300">
              {data.strInstructions
                .split(".")
                .filter((step) => step.trim() !== "")
                .map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 font-bold text-indigo-300">
                      {index + 1}
                    </div>

                    <p>{step.trim()}.</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
