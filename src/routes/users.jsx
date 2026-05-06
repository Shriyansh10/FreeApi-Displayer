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

  if (loading) return <div>Loading...</div>;
  // if (!data) return <div>No jokes found.</div>;

  return (
    <div>
      {data.data.map((user) => (
        <div key={user.id}>
          <img src={user.picture.large} alt={user.name.first} width="200" />

          <div>
            <p>{`${user.name.title}. ${user.name.first} ${user.name.last}`}</p>
            <p>{user.gender}</p>
            <p>{user.dob.age} years old</p>
          </div>
          <div>Email: {user.email}</div>
          <div>Phone: {user.phone}</div>
          <div>
            <p>
              HomeTown: {user.location.city}, {user.location.country}
            </p>
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
