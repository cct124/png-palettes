import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "normalize.css";
import "./styles/public.scss";
import "./styles/index.scss";
import { classNames } from "./utils/tools";
import Theming from "@src/components/Theming";
import I18n from "@src/components/I18n";

/**
 * css 类名处理全局注入
 */
window.classNames = classNames;

document.addEventListener("contextmenu", (event) => event.preventDefault());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Theming>
      <I18n>
        <App />
      </I18n>
    </Theming>
  </React.StrictMode>
);
