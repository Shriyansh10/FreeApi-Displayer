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

  if (loading) return <div>Loading...</div>;
  // if (!data) return <div>No jokes found.</div>;

  return (
    <div>
      <h1>{data.strMeal}</h1>
      <iframe
        width="560"
        height="315"
        src={data.strYoutube.replace("watch?v=", "embed/")}
        title={data.strMeal}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div>
        <h2>Ingredients:</h2>
        <ul>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
            const ingredient = data[`strIngredient${num}`];
            const measure = data[`strMeasure${num}`];
            return (
              ingredient && (
                <li key={num}>
                  {ingredient} - {measure}
                </li>
              )
            );
          })}
        </ul>
      </div>
      <div>
        <h2>Instructions:</h2>
        <p>{data.strInstructions}</p>
      </div>
    </div>
  );
}

// dateModified: null;
// id: 1;
// idMeal: "52785";
// strArea: "Indian";
// strCategory: "Vegetarian";
// strCreativeCommonsConfirmed: null;
// strDrinkAlternate: null;
// strImageSource: null;
// strIngredient1: "Toor dal";
// strIngredient2: "Water";
// strIngredient3: "Salt";
// strIngredient4: "Turmeric";
// strIngredient5: "Ghee";
// strIngredient6: "Chopped tomatoes";
// strIngredient7: "Cumin seeds";
// strIngredient8: "Mustard Seeds";
// strIngredient9: "Bay Leaf";
// strIngredient10: "Green Chili";
// strIngredient11: "Ginger";
// strIngredient12: "Cilantro";
// strIngredient13: "Red Pepper";
// strIngredient14: "Salt";
// strIngredient15: "Sugar";
// strIngredient16: "Garam Masala";
// strIngredient17: "";
// strIngredient18: "";
// strIngredient19: "";
// strIngredient20: "";
// strInstructions: "Wash and soak toor dal in approx. 3 cups of water, for at least one hours. Dal will be double in volume after soaking. Drain the water.\r\nCook dal with 2-1/2 cups water and add salt, turmeric, on medium high heat, until soft in texture (approximately 30 mins) it should be like thick soup.\r\nIn a frying pan, heat the ghee. Add cumin seeds, and mustard seeds. After the seeds crack, add bay leaves, green chili, ginger and chili powder. Stir for a few seconds.\r\nAdd tomatoes, salt and sugar stir and cook until tomatoes are tender and mushy.\r\nAdd cilantro and garam masala cook for about one minute.\r\nPour the seasoning over dal mix it well and cook for another minute.\r\nServe with Naan.";
// strMeal: "Dal fry";
// strMealThumb: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg";
// strMeasure1: "1 cup";
// strMeasure2: "2-1/2 cups";
// strMeasure3: "1 tsp";
// strMeasure4: "1/4 tsp";
// strMeasure5: "3 tbs";
// strMeasure6: "1 cup";
// strMeasure7: "1/2 tsp";
// strMeasure8: "1/2 tsp";
// strMeasure9: "2";
// strMeasure10: "1 tbs chopped";
// strMeasure11: "2 tsp shredded";
// strMeasure12: "2 tbs ";
// strMeasure13: "1/2 tsp";
// strMeasure14: "1/2 tsp";
// strMeasure15: "1 tsp";
// strMeasure16: "1/4 tsp";
// strMeasure17: "";
// strMeasure18: "";
// strMeasure19: "";
// strMeasure20: "";
// strSource: "https://www.instagram.com/p/BO21bpYD3Fu";
// strTags: "Curry,Vegetarian,Cake";
// strYoutube: "https://www.youtube.com/watch?v=J4D855Q9-jg";
