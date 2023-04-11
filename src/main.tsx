import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "normalize.css";
import "./styles/index.scss";
import "./styles/public.scss";
import "./styles/variables.scss";
import { classNames } from "./utils/tools";

window.classNames = classNames;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
