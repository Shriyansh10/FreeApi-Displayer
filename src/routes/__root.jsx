import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
  <div> <a href="https://freeapi.hashnode.space/api-guide/apireference/getUsers">FreeApi</a> Data Displayer</div>
    <div className="p-2 flex gap-2">
      <Link to="/random-cat" className="[&.active]:font-bold">
        Random Cat
      </Link>{" "}
      <Link to="/jokes" className="[&.active]:font-bold">
        Jokes
      </Link>{" "}
      <Link to="/meals" className="[&.active]:font-bold">
        Meals
      </Link>{" "}
      <Link to="/products" className="[&.active]:font-bold">
        Products
      </Link>{" "}
      <Link to="/quotes" className="[&.active]:font-bold">
        Quotes
      </Link>{" "}
      <Link to="/users" className="[&.active]:font-bold">
        Users
      </Link>{" "}
      <Link to="/videos" className="[&.active]:font-bold">
        Videos
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
