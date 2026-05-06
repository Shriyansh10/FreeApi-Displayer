import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchData } from "../services/fetchData.js";

export const Route = createFileRoute("/jokes")({
  component: RouteComponent,
});

function RouteComponent() {
  const [values, setValues] = useState({
    url: "https://api.freeapi.app/api/v1/public/randomjokes",
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

  // {
  //   "page": 1,
  //   "limit": 10,
  //   "totalPages": 147,
  //   "previousPage": false,
  //   "nextPage": true,
  //   "totalItems": 1465,
  //   "currentPageItems": 10,
  //   "data": [
  //     {
  //       "categories": [],
  //       "id": 1,
  //       "content": "Chuck Norris invented the bolt-action rifle, liquor, sexual intercourse, and football-- in that order."
  //     },
  //   ]
  // },

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
      </div>
    );
  }

  return (
    // <div>
    //   {data.data.map((joke) => (
    //     <div key={joke.id}>{joke.content}</div>
    //   ))}
    //   <button onClick={() => setValues({...values, page: Math.max(1, values.page - 1)})}>
    //     Previous Page
    //   </button>
    //   <button>Page {data.page} / {data.totalPages}</button>
    //   <button onClick={() => setValues({...values, page: Math.min(data.totalPages, values.page + 1)})}>
    //     Next Page
    //   </button>
    // </div>
    <section className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Random Jokes
        </h1>

        <p className="mt-2 text-slate-400">
          Explore random jokes fetched from public APIs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {data?.data.map((joke, index) => (
          <article
            key={`${joke.id}-${index}`}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
                Joke #{index + 1}
              </span>
            </div>

            <p className="text-lg leading-8 text-slate-200">{joke.content}</p>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          onClick={() =>
            setValues({ ...values, page: Math.max(1, values.page - 1) })
          }
          disabled={data.page === 1}
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:border-indigo-400 hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
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
          disabled={data.page === data.totalPages}
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:border-indigo-400 hover:bg-indigo-500/20"
        >
          Next
        </button>
      </div>
    </section>
  );
}
