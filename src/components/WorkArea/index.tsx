import React from "react";
import styles from "./index.module.scss";

/**
 * 工作区域
 * @returns
 */
export default function WorkArea() {
  return <div className={classNames(styles.workArea, "h-100vh", "grow")}></div>;
}
