import { useContext } from "react";
import styles from "./index.module.scss";
import { ThemeStateContext } from "@src/context/theming";

export enum BUTTON_TYPE {
  /**
   * 默认
   */
  DEFAULT = "default",
  /**
   * 主要的
   */
  PRIMARY = "primary",
}

/**
 * 按钮组件
 * @param param0
 * @returns
 */
export default function Button({
  children,
  onClick,
  type = BUTTON_TYPE.DEFAULT,
  className,
}: {
  children?: JSX.Element | JSX.Element[] | string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: BUTTON_TYPE;
  className?: string | undefined;
}) {
  const [theme] = useContext(ThemeStateContext);

  return (
    <button
      className={classNames(
        styles.button,
        styles[theme],
        styles[type],
        className
      )}
      data-type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
