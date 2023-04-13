import styles from "./index.module.scss";

/**
 * 按钮组件
 * @param param0
 * @returns
 */
export default function Button({
  children,
  onClick,
}: {
  children?: JSX.Element | JSX.Element[] | string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <button className={classNames(styles.button)} onClick={onClick}>
      {children}
    </button>
  );
}
