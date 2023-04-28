import { useRef, useEffect, useContext } from "react";
import styles from "./index.module.scss";
import Button from "@src/components/UI/Button";
import { I18n } from "@src/context/i18n";

export default function DropContainer({
  onOpenFile,
}: {
  onOpenFile: () => void;
}) {
  const [i18n] = useContext(I18n);
  const drop = useRef<HTMLDivElement>(null);

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
      <Button
        className={classNames(styles.openFile, "fs-14")}
        onClick={onOpenFile}
      >
        {i18n.workArea.dropContainer.openFile}
      </Button>
    </div>
  );
}
