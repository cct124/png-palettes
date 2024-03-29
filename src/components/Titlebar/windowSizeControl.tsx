import { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { ReactComponent as MaximizeSvg } from "@src/assets/icons/svg/maximize.svg";
import { ReactComponent as NormalSize } from "@src/assets/icons/svg/normal_size.svg";

/**
 * 窗口最大化最小化状态组件
 * @returns
 */
export default function WindowSizeControl() {
  const [maximized, setMaximized] = useState(false);
  appWindow.listen("tauri://resize", async (event) => {
    const maximized = await appWindow.isMaximized();
    setMaximized(maximized);
  });
  return maximized ? <MaximizeSvg /> : <NormalSize />;
}
