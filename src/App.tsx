import { ChangeEvent, useState } from "react";
import styles from "./App.module.scss";
import Container from "./components/Container";
import Titlebar from "./components/Titlebar";

function App() {
  return (
    <div className={classNames(styles.app, "w-100vw", "h-100vh", "hidden")}>
      <Titlebar></Titlebar>
      <Container></Container>
    </div>
  );
}

export default App;
