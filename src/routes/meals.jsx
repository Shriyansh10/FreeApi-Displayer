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

  if (loading) return <div>Loading...</div>;
  // if (!data) return <div>No jokes found.</div>;

  return (
    <div>
      {data.data.map((meal) => (
        <div key={meal.idMeal}>
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} width="200" />
          <p>{meal.strArea} Cuisine</p>
          <span>Category: {meal.strCategory}</span>
          <div>
            <Link to={`/meal/${meal.id}`} params={{ mealId: meal.id }}>
              <span>View Details</span>
            </Link>
            <span>
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Recipe Source
              </a>
            </span>
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

// {
//   "statusCode": 200,
//   "data": {
//     "page": 1,
//     "limit": 10,
//     "totalPages": 30,
//     "previousPage": false,
//     "nextPage": true,
//     "totalItems": 293,
//     "currentPageItems": 10,
//     "data": [
//       {
//         "idMeal": "52785",
//         "strMeal": "Dal fry",
//         "strDrinkAlternate": null,
//         "strCategory": "Vegetarian",
//         "strArea": "Indian",
//         "strInstructions": "Wash and soak toor dal in approx. 3 cups of water, for at least one hours. Dal will be double in volume after soaking. Drain the water.\r\nCook dal with 2-1/2 cups water and add salt, turmeric, on medium high heat, until soft in texture (approximately 30 mins) it should be like thick soup.\r\nIn a frying pan, heat the ghee. Add cumin seeds, and mustard seeds. After the seeds crack, add bay leaves, green chili, ginger and chili powder. Stir for a few seconds.\r\nAdd tomatoes, salt and sugar stir and cook until tomatoes are tender and mushy.\r\nAdd cilantro and garam masala cook for about one minute.\r\nPour the seasoning over dal mix it well and cook for another minute.\r\nServe with Naan.",
//         "strMealThumb": "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
//         "strTags": "Curry,Vegetarian,Cake",
//         "strYoutube": "https://www.youtube.com/watch?v=J4D855Q9-jg",
//         "strIngredient1": "Toor dal",
//         "strIngredient2": "Water",
//         "strIngredient3": "Salt",
//         "strIngredient4": "Turmeric",
//         "strIngredient5": "Ghee",
//         "strIngredient6": "Chopped tomatoes",
//         "strIngredient7": "Cumin seeds",
//         "strIngredient8": "Mustard Seeds",
//         "strIngredient9": "Bay Leaf",
//         "strIngredient10": "Green Chili",
//         "strIngredient11": "Ginger",
//         "strIngredient12": "Cilantro",
//         "strIngredient13": "Red Pepper",
//         "strIngredient14": "Salt",
//         "strIngredient15": "Sugar",
//         "strIngredient16": "Garam Masala",
//         "strIngredient17": "",
//         "strIngredient18": "",
//         "strIngredient19": "",
//         "strIngredient20": "",
//         "strMeasure1": "1 cup",
//         "strMeasure2": "2-1/2 cups",
//         "strMeasure3": "1 tsp",
//         "strMeasure4": "1/4 tsp",
//         "strMeasure5": "3 tbs",
//         "strMeasure6": "1 cup",
//         "strMeasure7": "1/2 tsp",
//         "strMeasure8": "1/2 tsp",
//         "strMeasure9": "2",
//         "strMeasure10": "1 tbs chopped",
//         "strMeasure11": "2 tsp shredded",
//         "strMeasure12": "2 tbs ",
//         "strMeasure13": "1/2 tsp",
//         "strMeasure14": "1/2 tsp",
//         "strMeasure15": "1 tsp",
//         "strMeasure16": "1/4 tsp",
//         "strMeasure17": "",
//         "strMeasure18": "",
//         "strMeasure19": "",
//         "strMeasure20": "",
//         "strSource": "https://www.instagram.com/p/BO21bpYD3Fu",
//         "strImageSource": null,
//         "strCreativeCommonsConfirmed": null,
//         "dateModified": null,
//         "id": 1
//       },
//     ]
//   },
//   "message": "Meals fetched successfully",
//   "success": true
// }
