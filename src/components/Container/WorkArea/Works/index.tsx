import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import Work from "./Work";
import { ThemeStateContext } from "@src/context/theming";
import { I18n } from "@src/context/i18n";

/**
 * 任务列表
 * @param param0
 * @returns
 */
export default function Works({ workList }: { workList: WorkListType[] }) {
  const [theme] = useContext(ThemeStateContext);
  const [i18n] = useContext(I18n);

  const fileNum = workList.length && (
    <div className={classNames(styles.info, "flex-center pad-lr-15")}>
      <span className={classNames(styles.file, "fs-12")}>
        {i18n.workArea.works.filesNum}：{workList.length}
      </span>
    </div>
  );

  return (
    <div
      className={classNames(
        styles.works,
        "flex flex-column w-100p h-100p relative"
      )}
    >
      <div className={classNames(styles.top, styles[theme], "grow scroll-y")}>
        {workList.map((w) => (
          <Work work={w} key={w.id}></Work>
        ))}
      </div>
      <div
        className={classNames(
          styles.filesInfo,
          styles[theme],
          "flex-jcfe-aic absolute w-100p"
        )}
      >
        {fileNum}
      </div>
    </div>
  );
}
