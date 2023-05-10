import { useCallback, useContext, useMemo } from "react";
import styles from "./index.module.scss";
import Img, { ObjectFit } from "@src/components/UI/Img";
import { ReactComponent as EmptyImg } from "@src/assets/icons/svg/empty_img.svg";
import { ThemeStateContext } from "@src/context/theming";
import { I18N_TYPE, I18n } from "@src/context/i18n";
import { ReactComponent as RightArrow } from "@src/assets/icons/svg/right_arrow.svg";
import { WorkStatus } from "@src/context/workList";

/**
 * 任务项
 * @param param0
 * @returns
 */
export default function Work({ work }: { work: WorkListType }) {
  const [i18n] = useContext(I18n);
  const [theme] = useContext(ThemeStateContext);
  const img =
    work.base64 === "" ? (
      EmptyImg({})
    ) : (
      <Img src={work.base64} objectFit={ObjectFit.CONTAIN} />
    );

  const originalSize = useCallback(
    () => formatFileSize(work.originalSize),
    [work.originalSize]
  );

  const size = useCallback(() => formatFileSize(work.size), [work.size]);

  const reduVal = useCallback(() => {
    return Math.round(100 - (work.size / work.originalSize) * 100);
  }, [work.originalSize, work.size]);

  const fileInfo =
    work.originalSize !== 0 ? (
      <div className="flex-center">
        <span>{originalSize()}</span>
        <RightArrow className={styles.rightArrow}></RightArrow>
        <span className="mar-r-10">{size()}</span>
        <span>{reduVal()}%</span>
        <RightArrow className={styles.downArrow}></RightArrow>
      </div>
    ) : (
      ""
    );

  const workInfo = createWorkInfo(work, i18n);

  return (
    <div
      className={classNames(
        styles.work,
        styles[theme],
        styles[work.status],
        "flex-jcsb-aic relative w-100p"
      )}
    >
      <div className={classNames(styles.left, "flex-jcfs-aic")}>
        <div className={classNames(styles.preview, "flex-center z-1 shrink")}>
          {img}
        </div>
        <p
          className={classNames(
            styles.path,
            "fs-14 z-1 text-overflow-hidden lh-20"
          )}
          title={work.path}
        >
          {work.path}
        </p>
      </div>
      <div className={classNames(styles.right)}>{workInfo}</div>
      <div className={classNames(styles.fileInfo, "fs-10")}>{fileInfo}</div>
    </div>
  );
}

function createWorkInfo(work: WorkListType, i18n: I18N_TYPE) {
  if (work.status === WorkStatus.ERROR) {
    let msg;
    switch (work.err) {
      case "QualityTooLow":
        msg = i18n.error.QualityTooLow;
        break;
      case "Unsupported_Color_Mode":
        msg = i18n.error.Unsupported_Color_Mode;
        break;
      default:
        msg = i18n.error.ProgramError;
        break;
    }

    return <p className={classNames(styles.error, "fs-10")}>{msg}</p>;
  } else {
    return (
      <p className={classNames(styles.progress, "fs-14")}>{work.progress}%</p>
    );
  }
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return bytes + " bytes";
  } else if (bytes < 1048576) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(2) + " MB";
  } else {
    return (bytes / 1073741824).toFixed(2) + " GB";
  }
}
