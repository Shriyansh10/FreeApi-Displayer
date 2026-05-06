import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchData } from "../services/fetchData.js";

export const Route = createFileRoute("/users")({
  component: RouteComponent,
});

function RouteComponent() {
  const [values, setValues] = useState({
    url: "https://api.freeapi.app/api/v1/public/randomusers",
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
          Users Directory
        </h1>

        <p className="mt-2 text-slate-400">
          Browse randomly generated users from around the world.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {data.data.map((user) => (
          <article
            key={user.id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40"
          >
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-indigo-500/40 to-purple-500/30" />

              <div className="absolute left-1/2 top-16 -translate-x-1/2">
                <img
                  src={user.picture.large}
                  alt={user.name.first}
                  className="h-32 w-32 rounded-full border-4 border-slate-900 object-cover shadow-xl"
                />
              </div>
            </div>

            <div className="space-y-6 px-6 pb-6 pt-20">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white">
                  {`${user.name.title}. ${user.name.first} ${user.name.last}`}
                </h2>

                <p className="mt-2 capitalize text-slate-400">{user.gender}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Age</p>

                  <p className="mt-2 text-lg font-semibold text-white">
                    {user.dob.age} years
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Nationality</p>

                  <p className="mt-2 text-lg font-semibold text-white">
                    {user.nat}
                  </p>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div>
                  <p className="text-sm text-slate-400">Email</p>

                  <p className="mt-1 break-all text-white">{user.email}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Phone</p>

                  <p className="mt-1 text-white">{user.phone}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Location</p>

                  <p className="mt-1 text-white">
                    {user.location.city}, {user.location.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-indigo-500/10 px-5 py-4">
                <div>
                  <p className="text-sm text-slate-400">Username</p>

                  <p className="mt-1 font-medium text-white">
                    {user.login.username}
                  </p>
                </div>

                <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-300">
                  Active
                </div>
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

  // if (loading) return <div>Loading...</div>;
  // // if (!data) return <div>No jokes found.</div>;

  // return (
  //   <div>
  //     {data.data.map((user) => (
  //       <div key={user.id}>
  //         <img src={user.picture.large} alt={user.name.first} width="200" />

  //         <div>
  //           <p>{`${user.name.title}. ${user.name.first} ${user.name.last}`}</p>
  //           <p>{user.gender}</p>
  //           <p>{user.dob.age} years old</p>
  //         </div>
  //         <div>Email: {user.email}</div>
  //         <div>Phone: {user.phone}</div>
  //         <div>
  //           <p>
  //             HomeTown: {user.location.city}, {user.location.country}
  //           </p>
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
}

// {
// "statusCode": 200,
// "data": {
//   "page": 1,
//   "limit": 10,
//   "totalPages": 50,
//   "previousPage": false,
//   "nextPage": true,
//   "totalItems": 500,
//   "currentPageItems": 10,
//   "data": [
//     {
//       "gender": "male",
//       "name": {
//         "title": "Mr",
//         "first": "Joseph",
//         "last": "Evans"
//       },
//       "location": {
//         "street": {
//           "number": 61,
//           "name": "Lunn Avenue"
//         },
//         "city": "Hastings",
//         "state": "Otago",
//         "country": "New Zealand",
//         "postcode": 92298,
//         "coordinates": {
//           "latitude": "51.9039",
//           "longitude": "-45.2357"
//         },
//         "timezone": {
//           "offset": "-6:00",
//           "description": "Central Time (US & Canada), Mexico City"
//         }
//       },
//       "email": "joseph.evans@example.com",
//       "login": {
//         "uuid": "9230749e-c285-41b4-9a0f-46dab2454b4e",
//         "username": "angryzebra337",
//         "password": "otis",
//         "salt": "WiHweSpK",
//         "md5": "2cc09194861ea12e8e842cdce5749230",
//         "sha1": "aa808f8a4f03df53a427905ae690c677b2d68895",
//         "sha256": "c857e62a617c9015a05b9ecc7f63e05c90042bd79514ca49bacfdf7e97b482d8"
//       },
//       "dob": {
//         "date": "1968-07-21T10:02:51.768Z",
//         "age": 54
//       },
//       "registered": {
//         "date": "2019-01-31T10:09:35.816Z",
//         "age": 4
//       },
//       "phone": "(612)-327-2806",
//       "cell": "(029)-082-3612",
//       "id": 1,
//       "picture": {
//         "large": "https://randomuser.me/api/portraits/men/65.jpg",
//         "medium": "https://randomuser.me/api/portraits/med/men/65.jpg",
//         "thumbnail": "https://randomuser.me/api/portraits/thumb/men/65.jpg"
//       },
//       "nat": "NZ"
//     },
