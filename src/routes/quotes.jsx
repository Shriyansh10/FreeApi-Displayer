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

  
  if (loading) return <div>Loading...</div>;
  // if (!data) return <div>No jokes found.</div>;

  return (
    <div>
      {data.data.map((quote) => (
        <div key={quote.id}>
          <div>{quote.author}</div>
          <div>{quote.content}</div>
        </div>
      ))}
      <button
        onClick={() =>
          setValues({ ...values, page: Math.max(1, values.page - 1) })
        }
      >
        Previous Page
      </button>
      <button>
        Page {data.page} / {data.totalPages}
      </button>
      <button
        onClick={() =>
          setValues({
            ...values,
            page: Math.min(data.totalPages, values.page + 1),
          })
        }
      >
        Next Page
      </button>
    </div>
  );
}
