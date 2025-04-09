import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import routes from "./routes";
import { Suspense } from "react";

function App() {
  const content = useRoutes(routes);

  return (
    <>
      <CssBaseline />
      <Suspense
        fallback={<div style={{ padding: "2rem" }}>Loading page...</div>}
      >
        {content}
      </Suspense>
    </>
  );
}

export default App;
