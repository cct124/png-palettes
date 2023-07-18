import { useContext } from "react";
import styles from "./index.module.scss";
import ThemeSwitch from "./ThemeSwitch";
import { I18n, languages } from "@src/context/i18n";
import * as dialog from "@tauri-apps/api/dialog";
import { open } from "@tauri-apps/api/shell";
import { getVersion } from "@tauri-apps/api/app";
import { ReactComponent as GitHubSvg } from "@src/assets/icons/svg/github.svg"; // 关闭图标
import { ThemeStateContext } from "@src/context/theming";

export default function UIControl() {
  const [i18n, setI18n] = useContext(I18n);
  const [theme] = useContext(ThemeStateContext);

  async function about() {
    const appVersion = await getVersion();

    dialog.message(
      `${i18n.dialog.about.version}${appVersion} \r\n` +
        i18n.dialog.about.content,
      {
        type: "info",
        title: i18n.dialog.about.title,
      }
    );
  }

  function onSelect(e: React.FormEvent<HTMLSelectElement>) {
    const id = Number((e.target as HTMLSelectElement).value);
    const language = languages.find((lan) => lan.id === id);
    if (language) {
      setI18n(language.data);
      window.$local.i18n = id;
    }
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
          className={classNames(styles.github, styles[theme], "fs-10 mar-r-10")}
          onClick={() => open("https://github.com/cct124/png-palettes")}
        >
          <GitHubSvg></GitHubSvg>
        </div>
        <div className={classNames(styles.language, "fs-10 flex-center")}>
          <select
            name="select"
            onInput={onSelect}
            defaultValue={window.$local.i18n}
          >
            {languages.map((lan) => (
              <option value={lan.id} key={lan.id}>
                {lan.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ThemeSwitch></ThemeSwitch>
    </div>
  );
}
