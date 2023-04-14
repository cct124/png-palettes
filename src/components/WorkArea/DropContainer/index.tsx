import { useRef, useEffect, useContext } from "react";
import styles from "./index.module.scss";
import Button from "@src/components/UI/Button";
import * as dialog from "@tauri-apps/api/dialog";
import { ThemeStateContext, THEMING_TYPE } from "@src/context/theming";

export default function DropContainer() {
  const drop = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useContext(ThemeStateContext);

  useEffect(() => {
    if (drop.current) {
      drop.current.addEventListener("dragover", handleDragOver);
      drop.current.addEventListener("drop", handleDrop);
    }

    return () => {
      if (drop.current) {
        drop.current.removeEventListener("dragover", handleDragOver);
        drop.current.removeEventListener("drop", handleDrop);
      }
    };
  }, []);

  /**
   * 元素放置目标上触发事件处理
   * @param e
   */
  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * 元素放置目标上触发事件处理
   * @param e
   */
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  async function openFile() {
    const selected = await dialog.open({
      multiple: true,
      filters: [
        {
          name: "Image",
          extensions: ["png"],
        },
      ],
    });
    console.log(selected);
  }

  function switchTheme() {
    setTheme(THEMING_TYPE.DARK);
    console.log(theme);
  }

  return (
    <div
      ref={drop}
      className={classNames(
        styles.dropContainer,
        "flex-center",
        "w-100p",
        "h-100p"
      )}
    >
      <Button onClick={openFile}>openFile</Button>
      <Button onClick={switchTheme}>switchTheme</Button>
    </div>
  );
}
