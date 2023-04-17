import { useContext } from "react";
import styles from "./index.module.scss";
import UIControl from "./UIControl";
import Options from "./Options";
import { ThemeStateContext } from "@src/context/theming";

/**
 * 配置区域
 * @returns
 */
export default function OptionsArea() {
  const [theme] = useContext(ThemeStateContext);
  return (
    <div
      className={classNames(
        styles.optionsArea,
        styles[theme],
        "flex-jcfs-aic flex-column"
      )}
    >
      <Options></Options>
      <UIControl></UIControl>
    </div>
  );
}
