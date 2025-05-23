import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import App from "./app/App";
import store from './redux/store';

import "perfect-scrollbar/css/perfect-scrollbar.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter basename="/admin">
      <App />
    </BrowserRouter>
    </Provider> 
  </StrictMode>
);
