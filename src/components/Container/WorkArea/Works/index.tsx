import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import Work from "./Work";
import { ThemeStateContext } from "@src/context/theming";
import { I18n } from "@src/context/i18n";
import { WorkStatus } from "@src/context/workList";
import Button, { ButtonType } from "@src/components/UI/Button";
import { ReactComponent as DeleteSvg } from "@src/assets/icons/svg/delete.svg";

/**
 * 任务列表
 * @param param0
 * @returns
 */
export default function Works({
  workList,
  clearWorkList,
  complete,
}: {
  workList: WorkListType[];
  complete: boolean;
  clearWorkList: () => void;
}) {
  const [theme] = useContext(ThemeStateContext);
  const [i18n] = useContext(I18n);

  const fileNum = workList.length && (
    <div className={classNames(styles.info, "flex-center pad-lr-15 mar-lr-5")}>
      <span className={classNames(styles.file, "fs-12")}>
        {i18n.workArea.works.filesNum}：{workList.length}
      </span>
    </div>
  );

  const clearList = complete ? (
    <Button
      className={classNames(
        styles.clearWorkList,
        "flex-center pad-lr-15 mar-lr-5"
      )}
      type={ButtonType.PRIMARY}
      onClick={() => {
        clearWorkList();
      }}
    >
      <span className="fs-12">{i18n.workArea.works.clearWorkList}</span>
      <DeleteSvg></DeleteSvg>
    </Button>
  ) : (
    ""
  );

  return (
    <div
      className={classNames(
        styles.works,
        "flex flex-column w-100p h-100p relative"
      )}
    >
      <div
        className={classNames(
          styles.top,
          styles[theme],
          "w-100p grow scroll-y"
        )}
      >
        {workList.map((w) => (
          <Work work={w} key={w.id}></Work>
        ))}
      </div>
      <div
        className={classNames(
          styles.filesInfo,
          styles[theme],
          "flex-jcfe-aic absolute w-100p z-2"
        )}
      >
        {fileNum}
        {clearList}
        {complete}
      </div>
    </div>
  );
}
