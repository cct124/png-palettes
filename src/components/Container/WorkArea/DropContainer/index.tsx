import { useContext, useEffect } from "react";
import styles from "./index.module.scss";
import Button from "@src/components/UI/Button";
import { I18n } from "@src/context/i18n";
import { ThemeStateContext } from "@src/context/theming";
import { listen } from "@tauri-apps/api/event";

let _temp: string[] = [];
let _enter = false;

export default function DropContainer({
  onOpenFile,
  onOpenDir,
  onFileDrop,
  workList,
}: {
  onOpenFile: () => void;
  onOpenDir: () => void;
  onFileDrop: (files: string[]) => void;
  workList: WorkListType[];
}) {
  const [i18n] = useContext(I18n);
  const [theme] = useContext(ThemeStateContext);

  useEffect(() => {
    listen("tauri://file-drop", (e) => {
      if (workList.length !== 0) return;
      setTimeout(() => {
        if (_enter) {
          _enter = false;
          onFileDrop(e.payload as string[]);
        }
      }, 50);
    });

    listen("tauri://blur", () => {
      _enter = false;
    });
  }, []);

  function onMouseEnter() {
    _enter = true;
  }

  function onMouseOver() {
    _enter = false;
  }

  return (
    <div
      className={classNames(
        styles.dropContainer,
        "flex-center",
        "w-100p",
        "h-100p"
      )}
    >
      <div
        className={classNames(
          styles.container,
          styles[theme],
          "flex-center flex-column"
        )}
        onMouseEnter={onMouseEnter}
        onMouseOver={onMouseOver}
      >
        <div>
          <Button
            className={classNames(styles.openFile, "fs-14 mar-r-10")}
            onClick={onOpenDir}
          >
            {i18n.workArea.dropContainer.openDir}
          </Button>
          <Button
            className={classNames(styles.openFile, "fs-14")}
            onClick={onOpenFile}
          >
            {i18n.workArea.dropContainer.openFile}
          </Button>
        </div>
        <p className={classNames(styles.tips1, "fs-10 ls-1")}>
          {i18n.workArea.dropContainer.tips1}
        </p>
      </div>
    </div>
  );
}
