import { useState, createContext } from "react";
import styles from "./index.module.scss";
import { ThemeStateContext, THEMING_TYPE } from "@src/context/theming";

export default function Theming({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string | number;
}) {
  const classNameThemeMap = {
    [THEMING_TYPE.LIGHT]: styles[THEMING_TYPE.LIGHT],
    [THEMING_TYPE.DARK]: styles[THEMING_TYPE.DARK],
  };
  const useThemeState = useState<THEMING_TYPE>(THEMING_TYPE.LIGHT);

  return (
    <div
      className={classNames(
        styles.theming,
        classNameThemeMap[useThemeState[0]]
      )}
    >
      <ThemeStateContext.Provider value={useThemeState}>
        {children}
      </ThemeStateContext.Provider>
    </div>
  );
}
