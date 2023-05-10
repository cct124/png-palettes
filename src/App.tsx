import { useContext } from "react";
import styles from "./App.module.scss";
import Container from "./components/Container";
import Titlebar from "./components/Titlebar";
import { ThemeStateContext, THEMING_TYPE } from "@src/context/theming";

function App() {
  const [theme] = useContext(ThemeStateContext);
  return (
    <div
      className={classNames(
        styles.app,
        styles[theme],
        "w-100vw",
        "h-100vh",
        "hidden"
      )}
    >
      <Titlebar></Titlebar>
      <Container></Container>
    </div>
  );
}

export default App;
