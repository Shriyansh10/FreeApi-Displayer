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
    // <>
    //   <button
    //     onClick={() => {
    //       setRefresh((prev) => !prev);
    //     }}
    //   >
    //     Get New Cat
    //   </button>
    //   <div>
    //     <h1>{data?.name}</h1>
    //     <img src={data?.image} alt={data?.name} />
    //     <p>{data?.description}</p>
    //     <p>
    //       Weight: {data?.weight?.imperial} lbs / {data?.weight?.metric} kgs
    //     </p>
    //     {/* tags */}
    //     <div>
    //       <p>Temperament: {data?.temperament}</p>
    //       <p>Origin: {data?.origin}</p>
    //       <p>Life Span: {data?.life_span} years</p>
    //     </div>
    //     <div>
    //       <p>Affection Level: {data?.affection_level}</p>
    //       <p>Energy Level: {data?.energy_level}</p>
    //       <p>Intelligence: {data?.intelligence}</p>
    //       <p>Dog Friendly: {data?.dog_friendly}</p>
    //       <p>Child Friendly: {data?.child_friendly}</p>
    //       <p>Grooming: {data?.grooming}</p>
    //       <p>Health Issues: {data?.health_issues}</p>
    //       <p>Shedding Level: {data?.shedding_level}</p>
    //     </div>
    //   </div>
    // </>
    <section className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Random Cat Explorer
          </h1>

          <p className="mt-2 text-slate-400">
            Discover beautiful cat breeds from around the world.
          </p>
        </div>

        <button
          onClick={() => {
            setRefresh((prev) => !prev);
          }}
          className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 px-6 py-3 font-medium text-indigo-300 transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-500/20 hover:text-white"
        >
          Get New Cat
        </button>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 shadow-2xl backdrop-blur-xl">
        <div className="grid lg:grid-cols-1">
          <div className="relative overflow-hidden">
            <img
              src={data?.image}
              alt={data?.name}
              className="h-full min-h-[400px] w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            <div>
              <div className="mb-4 inline-flex rounded-full bg-indigo-500/20 px-4 py-1 text-sm font-medium text-indigo-300">
                {data?.origin}
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white">
                {data?.name}
              </h1>

              <p className="mt-5 leading-8 text-slate-300">
                {data?.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Weight</p>

                <h3 className="mt-2 text-lg font-semibold text-white">
                  {data?.weight?.imperial} lbs
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {data?.weight?.metric} kgs
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Life Span</p>

                <h3 className="mt-2 text-lg font-semibold text-white">
                  {data?.life_span} years
                </h3>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">
                Temperament
              </h2>

              <div className="flex flex-wrap gap-3">
                {data?.temperament?.split(",")?.map((item, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">
                Breed Stats
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Affection Level</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {data?.affection_level}/5
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Energy Level</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {data?.energy_level}/5
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Intelligence</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {data?.intelligence}/5
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Dog Friendly</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {data?.dog_friendly}/5
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Child Friendly</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {data?.child_friendly}/5
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Grooming</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {data?.grooming}/5
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Health Issues</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {data?.health_issues}/5
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Shedding Level</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {data?.shedding_level}/5
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
