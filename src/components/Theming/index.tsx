import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { ThemeStateContext, THEMING_TYPE } from "@src/context/theming";
import { appWindow } from "@tauri-apps/api/window";

export default function Theming({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string | number;
}) {
  const useThemeState = useState<THEMING_TYPE>(THEMING_TYPE.LIGHT);
  const [, SetThemeState] = useThemeState;

  useEffect(() => {
    appWindow.theme().then((res) => {
      if (res === "light") {
        SetThemeState(THEMING_TYPE.LIGHT);
      } else {
        SetThemeState(THEMING_TYPE.DARK);
      }
    });
  }, []);

  return (
    <div className={classNames(styles.theming, styles[useThemeState[0]])}>
      <ThemeStateContext.Provider value={useThemeState}>
        {children}
      </ThemeStateContext.Provider>
    </div>
  );
}
