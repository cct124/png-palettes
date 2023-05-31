import { useContext } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { getName } from "@tauri-apps/api/app";
import styles from "./index.module.scss";
import { ReactComponent as CloseSvg } from "@src/assets/icons/svg/close.svg"; // 关闭图标
import { ReactComponent as MinimizeSvg } from "@src/assets/icons/svg/minimize.svg"; // 最小化图标
import { ReactComponent as LogoSvg } from "@src/assets/icons/svg/logo.svg"; // 最小化图标
import WindowSizeControl from "./windowSizeControl";
import { ThemeStateContext, THEMING_TYPE } from "@src/context/theming";

const appName = await getName();

/**
 * 窗口标题栏
 * @returns
 */
export default function Container() {
  const [theme] = useContext(ThemeStateContext);

  /**
   * 按钮
   */
  const tbtns = [MinimizeSvg, WindowSizeControl, CloseSvg].map((v, i) => (
    <div
      className={classNames(styles.icon, styles[theme], "flex-center")}
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
      className={classNames(
        styles.titlebar,
        styles[theme],
        "flex-jcsb-aic",
        "pad-l-5"
      )}
    >
      <div
        data-tauri-drag-region
        className={classNames(styles.left, "flex-jcfs-aic")}
      >
        <div
          data-tauri-drag-region
          className={classNames(styles.logo, "mar-r-5")}
        >
          <LogoSvg></LogoSvg>
        </div>
        <h1 data-tauri-drag-region className="fs-13">
          {appName}
        </h1>
      </div>
      <div className={classNames(styles.middle, "grow")}></div>
      <div className={classNames(styles.right, "flex-jcfs-aifs")}>{tbtns}</div>
    </div>
  );
}
