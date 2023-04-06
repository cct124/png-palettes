import { ChangeEvent, useState } from "react";
import styles from "./App.module.scss";
import { invoke } from "@tauri-apps/api";

function App() {
  const [count, setCount] = useState(0);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [result, setResult] = useState(0);

  return (
    <div className="App">
      <div className="mar-b-20">
        <div className={classNames(styles.add, "flex")}>
          <input
            className="mar-r-10"
            type="number"
            value={left}
            onChange={(e) => setLeft(Number(e.target.value))}
          />
          <input
            className="mar-r-10"
            type="number"
            value={right}
            onChange={(e) => setRight(Number(e.target.value))}
          />
          <span className="mar-r-10">=</span>
          <span>{result}</span>
        </div>
        <button
          onClick={() =>
            invoke<number>("add", { l: left, r: right })
              // `invoke` 返回的是一个 Promise
              .then((response) => setResult(response))
          }
        >
          add
        </button>
      </div>
      <div className="greet">
        <button
          onClick={() =>
            invoke("greet", { name: "World" })
              // `invoke` 返回的是一个 Promise
              .then((response) => console.log(response))
          }
        >
          greet
        </button>
      </div>
    </div>
  );
}

export default App;
