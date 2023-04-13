import { ChangeEvent, useState } from "react";
import styles from "./App.module.scss";
import Container from "./components/Container";
import Titlebar from "./components/Titlebar";
import Theming from "./components/Theming";

function App() {
  return (
    <Theming>
      <div className={classNames(styles.app, "w-100vw", "h-100vh", "hidden")}>
        <Titlebar></Titlebar>
        <Container></Container>
      </div>
    </Theming>
  );
}

export default App;
