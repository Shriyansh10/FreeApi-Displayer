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

  if (loading) return <div>Loading...</div>;
  // if (!data) return <div>No jokes found.</div>;

  return (
    <div>
      {data.data.map((joke) => (
        <div key={joke.id}>{joke.content}</div>
      ))}
      <button onClick={() => setValues({...values, page: Math.max(1, values.page - 1)})}>
        Previous Page
      </button>
      <button>Page {data.page} / {data.totalPages}</button>
      <button onClick={() => setValues({...values, page: Math.min(data.totalPages, values.page + 1)})}>
        Next Page
      </button>
    </div>
  );
}
