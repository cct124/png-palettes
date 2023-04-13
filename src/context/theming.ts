import { createContext } from "react";

/**
 * 主题类型
 */
export enum THEMING_TYPE {
  /**
   * 明亮
   */
  LIGHT = "light",
  /**
   * 黑暗
   */
  DARK = "DARK",
}

export const SetThemeContext = createContext<
  React.Dispatch<React.SetStateAction<THEMING_TYPE>>
>(null as any);
