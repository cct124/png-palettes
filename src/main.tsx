import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "normalize.css";
import "./styles/public.scss";
import "./styles/variables.scss";
import "./styles/index.scss";
import { classNames } from "./utils/tools";

/**
 * css 类名处理全局注入
 */
window.classNames = classNames;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
