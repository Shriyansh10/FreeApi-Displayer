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

  if (loading) return <div>Loading...</div>;
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

  return (
    <div>
      {}
      {data.data.map((product, index) => (
        <div key={product.id}>
          <div>
            <span
              onClick={() =>
                setImageIndexes((i) => ({
                  ...i,
                  [index]: Math.max(0, i[index] - 1),
                }))
              }
            >
              {"<"}
            </span>{" "}
            <p>
              Image {imageIndexes[index] + 1} of {images[index]?.length || 0}
            </p>{" "}
            <span
              onClick={() =>
                setImageIndexes((i) => ({
                  ...i,
                  [index]: Math.min(
                    images[index]?.length - 1 || 0,
                    i[index] + 1,
                  ),
                }))
              }
            >
              {">"}
            </span>
          </div>
          <h2>{product.title}</h2>
          <p>{product.brand}</p>
          <span>Category: {product.category}</span>
          <div>
            <span>Price: ${product.price}</span>
            <span>Rating: {product.rating}/5</span>
          </div>
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
