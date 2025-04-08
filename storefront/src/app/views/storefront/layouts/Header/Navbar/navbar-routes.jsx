import { lazy } from "react";

const Contact = lazy(() => import("../../../Contact/Contact"));
const About = lazy(() => import("../../../About/Index"));

const navbarRoutes = [
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
];

export default navbarRoutes;
