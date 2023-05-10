import { useState } from "react";
import styles from "./index.module.scss";

export default function Tips({
  children,
  text,
}: {
  children?: JSX.Element | JSX.Element[] | string;
  text: string;
}) {
  return (
    <div className={classNames(styles.tips)} title={text}>
      {children}
    </div>
  );
}
