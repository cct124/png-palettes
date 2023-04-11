import { appWindow } from "@tauri-apps/api/window";
import styles from "./index.module.scss";
import { ReactComponent as CloseSvg } from "../../assets/icon/svg/close.svg"; // 关闭图标
import { ReactComponent as MinimizeSvg } from "../../assets/icon/svg/minimize.svg"; // 最小化图标
import WindowSizeControl from "./windowSizeControl";

/**
 * 窗口标题栏
 * @returns
 */
export default function Container() {
  /**
   * 按钮
   */
  const tbtns = [MinimizeSvg, WindowSizeControl, CloseSvg].map((v, i) => (
    <div
      className={classNames(styles.icon, "flex-center")}
      data-name={v.name}
      key={i}
      onClick={() => tap(v.name)}
    >
      {v({ title: v.name })}
    </div>
  ));

  function tap(name: string) {
    switch (name) {
      case MinimizeSvg.name:
        appWindow.minimize();
        break;
      case WindowSizeControl.name:
        appWindow.toggleMaximize();
        break;
      case CloseSvg.name:
        appWindow.close();
        break;
      default:
        break;
    }
  }

  return (
    <div
      data-tauri-drag-region
      className={classNames(styles.titlebar, "flex-jcsb-aic")}
    >
      <div className={classNames(styles.left)}></div>
      <div className={classNames(styles.middle, "grow")}></div>
      <div className={classNames(styles.right, "flex-jcfs-aifs")}>{tbtns}</div>
    </div>
  );
}
