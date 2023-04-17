import { useState } from "react";
import styles from "./index.module.scss";
import { ThemeStateContext, THEMING_TYPE } from "@src/context/theming";

export default function Theming({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string | number;
}) {
  const useThemeState = useState<THEMING_TYPE>(THEMING_TYPE.LIGHT);

  return (
    <div className={classNames(styles.theming, styles[useThemeState[0]])}>
      <ThemeStateContext.Provider value={useThemeState}>
        {children}
      </ThemeStateContext.Provider>
    </div>
  );
}
