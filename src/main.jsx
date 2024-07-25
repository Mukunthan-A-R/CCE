import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import { RecoilRoot } from "recoil";
import ReactGA from "react-ga4";

ReactGA.initialize("G-9LSP8TEJB9");
ReactGA.send({ hitType: "pageview", page: "window.location.pathname" });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
  </React.StrictMode>
);
