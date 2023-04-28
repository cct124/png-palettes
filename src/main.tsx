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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Theming>
      <I18n>
        <App />
      </I18n>
    </Theming>
  </React.StrictMode>
);

// (function () {
//   const li = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
//   for (const [i, iter] of li.entries()) {
//     console.log(i, 300 / iter);
//     const h = 204 + i * 6;
//     const s = 45 - i * 2.6;
//     const l = 100 - (iter * 100) / (2000 - iter);
//     console.log(
//       `${iter}: hsl(${h.toFixed(2)}, ${s.toFixed(2)}, ${l.toFixed(2)})`
//     );
//     // console.log(iter, 100 - (iter * 100) / (1920 - iter));
//   }
// })();
