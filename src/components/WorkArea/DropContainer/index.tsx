import { useRef, useEffect } from "react";
import styles from "./index.module.scss";

export default function DropContainer() {
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
      className={classNames(styles.dropContainer, "w-100p", "h-100p")}
    ></div>
  );
}
