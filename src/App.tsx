import { ChangeEvent, useState } from "react";
import styles from "./App.module.scss";
import { invoke } from "@tauri-apps/api";
import WorkArea from "./components/WorkArea";
import OptionsArea from "./components/OptionsArea";

function App() {
  return (
    <div className={classNames(styles.App, "flex")}>
      <WorkArea></WorkArea>
      <OptionsArea></OptionsArea>
    </div>
  );
}

export default App;
