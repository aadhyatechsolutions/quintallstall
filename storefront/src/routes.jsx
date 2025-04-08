import { lazy } from "react";
import Layout from "./app/views/storefront/layouts/Layout";
import Home from "./app/views/storefront/Home/Home";
import Shop from "./app/views/storefront/Shop/Shop";
import ProductList from "./app/views/storefront/Products/ProductList";
import Blog from "./app/views/storefront/Blog/Blog";

// Lazy load other components
const About = lazy(() => import("./app/views/storefront/About/Index"));
const Contact = lazy(() => import("./app/views/storefront/Contact/Contact"));

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "about",
        element: <About />,
      },
      { path: "contact", element: <Contact /> },
      { path: "shop", element: <Shop /> },
      { path: "products", element: <ProductList /> },
      { path: "blog", element: <Blog /> },
    ],
  },
];

export default routes;
