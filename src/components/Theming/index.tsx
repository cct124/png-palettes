import { useState, createContext } from "react";
import styles from "./index.module.scss";
import { SetThemeContext, THEMING_TYPE } from "@src/context/theming";

export default function Theming({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string | number;
}) {
  const [theme, setTheme] = useState<THEMING_TYPE>(THEMING_TYPE.LIGHT);

  return (
    <div className={classNames(styles[theme])}>
      <SetThemeContext.Provider value={setTheme}>
        {children}
      </SetThemeContext.Provider>
    </div>
  );
}
