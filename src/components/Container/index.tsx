import React from "react";
import styles from "./index.module.scss";
import OptionsArea from "../OptionsArea";
import WorkArea from "../WorkArea";

/**
 * 工作区容器
 * @returns
 */
export default function Container() {
  return (
    <div className={classNames(styles.container, "flex")}>
      <WorkArea></WorkArea>
      <OptionsArea></OptionsArea>
    </div>
  );
}
