import { lazy } from "react";
import storefrontRoutes from "./app/views/storefront/storefront-routes";
import Home from "./app/views/storefront/Home/Home";

const routes = [
  { path: "/", element: <Home /> },
  ...storefrontRoutes,
];

export default routes;
