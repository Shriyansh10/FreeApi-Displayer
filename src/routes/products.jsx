import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchData } from "../services/fetchData.js";

export const Route = createFileRoute("/products")({
  component: RouteComponent,
});

function RouteComponent() {
  const [values, setValues] = useState({
    url: "https://api.freeapi.app/api/v1/public/randomproducts",
    page: 1,
    limit: 10,
    method: "GET",
  });
  const [images, setImages] = useState({});
  const [imageIndexes, setImageIndexes] = useState([]);
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
        // console.log("Products data fetched successfully:", res.data);
        // if (res.data.data.length > 0)

        res.data.data.forEach((product, index) => {
          if (product.images.length > 0) {
            setImageIndexes((i) => ({ ...i, [index]: 0 }));
            setImages((i) => ({
              ...i,
              [index]: [
                product.thumbnail,
                ...product.images.filter((img) => {
                  if (img !== product.thumbnail) return img;
                }),
              ],
            }));
          } else {
            setImages((i) => ({ ...i, [index]: [product.thumbnail] }));
          }
        });

        setLoading(false);
      })
      .catch((err) => console.log("Data fetching error: ", err));

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.page]);

  // if (loading) return <div>Loading...</div>;
  // if (!data) return <div>No jokes found.</div>;

  // {
  //   "statusCode": 200,
  //   "data": {
  //     "page": 1,
  //     "limit": 10,
  //     "totalPages": 10,
  //     "previousPage": false,
  //     "nextPage": true,
  //     "totalItems": 100,
  //     "currentPageItems": 10,
  //     "data": [
  //       {
  //         "id": 1,
  //         "title": "iPhone 9",
  //         "description": "An apple mobile which is nothing like apple",
  //         "price": 549,
  //         "discountPercentage": 12.96,
  //         "rating": 4.69,
  //         "stock": 94,
  //         "brand": "Apple",
  //         "category": "smartphones",
  //         "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
  //         "images": [
  //           "https://cdn.dummyjson.com/product-images/1/1.jpg",
  //           "https://cdn.dummyjson.com/product-images/1/2.jpg",
  //           "https://cdn.dummyjson.com/product-images/1/3.jpg",
  //           "https://cdn.dummyjson.com/product-images/1/4.jpg",
  //           "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
  //         ]
  //       },
  //     ]
  //   },
  //   "message": "Random products fetched successfully",
  //   "success": true
  // }

  // return (
  //   <div>
  //     {}
  //     {data.data.map((product, index) => (
  //       <div key={product.id}>
  //         <div>
  //           <span
  //             onClick={() =>
  //               setImageIndexes((i) => ({
  //                 ...i,
  //                 [index]: Math.max(0, i[index] - 1),
  //               }))
  //             }
  //           >
  //             {"<"}
  //           </span>{" "}
  //           <p>
  //             Image {imageIndexes[index] + 1} of {images[index]?.length || 0}
  //           </p>{" "}
  //           <span
  //             onClick={() =>
  //               setImageIndexes((i) => ({
  //                 ...i,
  //                 [index]: Math.min(
  //                   images[index]?.length - 1 || 0,
  //                   i[index] + 1,
  //                 ),
  //               }))
  //             }
  //           >
  //             {">"}
  //           </span>
  //         </div>
  //         <h2>{product.title}</h2>
  //         <p>{product.brand}</p>
  //         <span>Category: {product.category}</span>
  //         <div>
  //           <span>Price: ${product.price}</span>
  //           <span>Rating: {product.rating}/5</span>
  //         </div>
  //       </div>
  //     ))}
  //     <button
  //       onClick={() =>
  //         setValues({ ...values, page: Math.max(1, values.page - 1) })
  //       }
  //     >
  //       Previous Page
  //     </button>
  //     <button>
  //       Page {data.page} / {data.totalPages}
  //     </button>
  //     <button
  //       onClick={() =>
  //         setValues({
  //           ...values,
  //           page: Math.min(data.totalPages, values.page + 1),
  //         })
  //       }
  //     >
  //       Next Page
  //     </button>
  //   </div>
  // );

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
          Product Showcase
        </h1>

        <p className="mt-2 text-slate-400">
          Explore modern products fetched from public APIs.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {data.data.map((product, index) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40"
          >
            <div className="relative overflow-hidden">
              <img
                src={images[index]?.[imageIndexes[index]]}
                alt={product.title}
                className="h-72 w-full object-cover transition duration-500 hover:scale-105"
              />

              <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                {product.brand}
              </div>

              <div className="absolute right-4 top-4 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold text-black">
                ⭐ {product.rating}
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-medium text-indigo-300">
                    {product.category}
                  </span>

                  <span className="text-sm text-emerald-400">
                    {product.stock} in stock
                  </span>
                </div>

                <h2 className="line-clamp-1 text-2xl font-bold text-white">
                  {product.title}
                </h2>

                <p className="mt-3 line-clamp-3 leading-7 text-slate-400">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-white">
                    ${product.price}
                  </p>

                  <p className="mt-1 text-sm text-rose-400">
                    {product.discountPercentage}% OFF
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                  <p className="text-xs text-slate-400">Rating</p>

                  <p className="mt-1 text-lg font-semibold text-white">
                    {product.rating}/5
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <button
                  onClick={() =>
                    setImageIndexes((i) => ({
                      ...i,
                      [index]: Math.max(0, i[index] - 1),
                    }))
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-lg text-white transition hover:border-indigo-400 hover:bg-indigo-500/20"
                >
                  ←
                </button>

                <p className="text-sm text-slate-300">
                  Image {imageIndexes[index] + 1} of{" "}
                  {images[index]?.length || 0}
                </p>

                <button
                  onClick={() =>
                    setImageIndexes((i) => ({
                      ...i,
                      [index]: Math.min(
                        images[index]?.length - 1 || 0,
                        i[index] + 1,
                      ),
                    }))
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-lg text-white transition hover:border-indigo-400 hover:bg-indigo-500/20"
                >
                  →
                </button>
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
