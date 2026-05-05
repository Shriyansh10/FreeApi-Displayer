import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchData } from "../services/fetchData.js";

export const Route = createFileRoute("/random-cat")({
  component: RouteComponent,
});

function RouteComponent() {
  const [values] = useState({
    url: "https://api.freeapi.app/api/v1/public/cats/cat/random",
    page: null,
    limit: null,
    method: "GET",
  });
  const [refresh, setRefresh] = useState(false);
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
      .then((res) => setData(res.data))
      .catch((err) => console.log("Data fetching error: ", err));

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.page, refresh]);

  // {
  //   "weight": {
  //     "imperial": "6 - 15",
  //     "metric": "3 - 7"
  //   },
  //   "id": 12,
  //   "name": "Birman",
  //   "cfa_url": "http://cfa.org/Breeds/BreedsAB/Birman.aspx",
  //   "vetstreet_url": "http://www.vetstreet.com/cats/birman",
  //   "vcahospitals_url": "https://vcahospitals.com/know-your-pet/cat-breeds/birman",
  //   "temperament": "Affectionate, Active, Gentle, Social",
  //   "origin": "France",
  //   "country_codes": "FR",
  //   "country_code": "FR",
  //   "description": "The Birman is a docile, quiet cat who loves people and will follow them from room to room. Expect the Birman to want to be involved in what you’re doing. He communicates in a soft voice, mainly to remind you that perhaps it’s time for dinner or maybe for a nice cuddle on the sofa. He enjoys being held and will relax in your arms like a furry baby.",
  //   "life_span": "14 - 15",
  //   "indoor": 0,
  //   "lap": 1,
  //   "alt_names": "Sacred Birman, Sacred Cat Of Burma",
  //   "adaptability": 5,
  //   "affection_level": 5,
  //   "child_friendly": 4,
  //   "dog_friendly": 5,
  //   "energy_level": 3,
  //   "grooming": 2,
  //   "health_issues": 1,
  //   "intelligence": 3,
  //   "shedding_level": 3,
  //   "social_needs": 4,
  //   "stranger_friendly": 3,
  //   "vocalisation": 1,
  //   "experimental": 0,
  //   "hairless": 0,
  //   "natural": 0,
  //   "rare": 0,
  //   "rex": 0,
  //   "suppressed_tail": 0,
  //   "short_legs": 0,
  //   "wikipedia_url": "https://en.wikipedia.org/wiki/Birman",
  //   "hypoallergenic": 0,
  //   "image": "https://cdn2.thecatapi.com/images/HOrX5gwLS.jpg"
  // },

  return (
    <>
      <button
        onClick={() => {
          setRefresh((prev) => !prev);
        }}
      >
        Get New Cat
      </button>
      <div>
        <h1>{data?.name}</h1>
        <img src={data?.image} alt={data?.name} />
        <p>{data?.description}</p>
        <p>
          Weight: {data?.weight?.imperial} lbs / {data?.weight?.metric} kgs
        </p>
        {/* tags */}
        <div>
          <p>Temperament: {data?.temperament}</p>
          <p>Origin: {data?.origin}</p>
          <p>Life Span: {data?.life_span} years</p>
        </div>
        <div>
          <p>Affection Level: {data?.affection_level}</p>
          <p>Energy Level: {data?.energy_level}</p>
          <p>Intelligence: {data?.intelligence}</p>
          <p>Dog Friendly: {data?.dog_friendly}</p>
          <p>Child Friendly: {data?.child_friendly}</p>
          <p>Grooming: {data?.grooming}</p>
          <p>Health Issues: {data?.health_issues}</p>
          <p>Shedding Level: {data?.shedding_level}</p>
        </div>
      </div>
    </>
  );
}
