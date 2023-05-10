import { useContext } from "react";
import styles from "./index.module.scss";
import ThemeSwitch from "./ThemeSwitch";
import { I18n } from "@src/context/i18n";
import * as dialog from "@tauri-apps/api/dialog";
import { open } from "@tauri-apps/api/shell";
import { ReactComponent as GitHubSvg } from "@src/assets/icons/svg/github.svg"; // 关闭图标
import { ThemeStateContext } from "@src/context/theming";

export default function UIControl() {
  const [i18n] = useContext(I18n);
  const [theme] = useContext(ThemeStateContext);

  function about() {
    dialog.message(
      "这是一个PNG图片压缩工具，选择所要压缩的图片时，软件将PNG图像的RGBA模式转为调色板模式，从而减小图像大小。\r\n如有别的问题请联系：huangdonghao1997@gmail.com",
      {
        type: "info",
        title: "关于",
      }
    );
  }

  return (
    <div
      className={classNames(styles.UIControl, "w-100p flex-jcsb-aic pad-lr-10")}
    >
      <div className="flex-center">
        <div
          className={classNames(styles.about, "fs-10 mar-r-10")}
          onClick={about}
        >
          {i18n.optionsArea.UIControl.about}
        </div>
        <div
          className={classNames(styles.github, styles[theme])}
          onClick={() => open("https://github.com/cct124/png-palettes")}
        >
          <GitHubSvg></GitHubSvg>
        </div>
      </div>
      <ThemeSwitch></ThemeSwitch>
    </div>
  );
}
