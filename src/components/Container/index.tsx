import { useContext, useState } from "react";
import styles from "./index.module.scss";
import OptionsArea from "./OptionsArea";
import WorkArea from "./WorkArea";
import { ThemeStateContext } from "@src/context/theming";
import {
  Compression,
  CompressionOptions,
  CompressionOptionsType,
} from "@src/context/options";

/**
 * 工作区容器
 * @returns
 */
export default function Container() {
  const [theme] = useContext(ThemeStateContext);
  const compressionOptions = useState<CompressionOptionsType>({
    speed: 4,
    qualityMinimum: 0,
    qualityTarget: 100,
    compression: Compression.Fast,
    ditheringLevel: 1.0,
  });

  return (
    <CompressionOptions.Provider value={compressionOptions}>
      <div className={classNames(styles.container, styles[theme], "flex")}>
        <WorkArea></WorkArea>
        <OptionsArea></OptionsArea>
      </div>
    </CompressionOptions.Provider>
  );
}
