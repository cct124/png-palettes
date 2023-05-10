import { useRef, useEffect, useContext } from "react";
import styles from "./index.module.scss";
import { ThemeStateContext, THEMING_TYPE } from "@src/context/theming";
import { ReactComponent as MoonSvg } from "@src/assets/icons/svg/moon.svg";
import { ReactComponent as SunSvg } from "@src/assets/icons/svg/sun.svg";

export default function ThemeSwitch() {
  const [theme, setTheme] = useContext(ThemeStateContext);
  const iconMap = {
    [THEMING_TYPE.LIGHT]: MoonSvg,
    [THEMING_TYPE.DARK]: SunSvg,
  };

  function switchTheme() {
    setTheme(
      theme === THEMING_TYPE.LIGHT ? THEMING_TYPE.DARK : THEMING_TYPE.LIGHT
    );
  }

  return (
    <div
      className={classNames(styles.themeSwitch, styles[theme], "flex-center")}
      onClick={switchTheme}
    >
      {iconMap[theme]({})}
    </div>
  );
}
