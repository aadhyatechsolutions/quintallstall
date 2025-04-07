import { lazy } from "react";
import PrivateRoute from "app/auth/PrivateRoute";

const NotFound = lazy(() => import("./NotFound"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));

const FirebaseLogin = lazy(() => import("./login/FirebaseLogin"));
const FirebaseRegister = lazy(() => import("./register/FirebaseRegister"));

const JwtLogin = lazy(() => import("./login/JwtLogin"));
const JwtRegister = lazy(() => import("./register/JwtRegister"));

// const Auth0Login = Loadable(lazy(() => import("./login/Auth0Login")));

const sessionRoutes = [
  { path: "/session/signup", element: <PrivateRoute> <JwtRegister /> </PrivateRoute> },
  { path: "/session/signin", element: <PrivateRoute> <JwtLogin /> </PrivateRoute>},
  { path: "/session/forgot-password", element: <PrivateRoute> <ForgotPassword /> </PrivateRoute>},
  { path: "*", element: <NotFound /> }
];

export default sessionRoutes;
