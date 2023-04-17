import { useContext } from "react";
import styles from "./index.module.scss";
import OptionsArea from "./OptionsArea";
import WorkArea from "./WorkArea";
import { ThemeStateContext } from "@src/context/theming";

/**
 * 工作区容器
 * @returns
 */
export default function Container() {
  const [theme] = useContext(ThemeStateContext);
  return (
    <div className={classNames(styles.container, styles[theme], "flex")}>
      <WorkArea></WorkArea>
      <OptionsArea></OptionsArea>
    </div>
  );
}
