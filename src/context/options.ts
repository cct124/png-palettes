import { createContext } from "react";

export enum Compression {
  /**
   * 默认级别
   */
  Default = "Default",
  /**
   * 快速最小压缩
   */
  Fast = "Fast",
  /**
   * 更高的压缩级别
   * 在这种情况下，Best实际上并不是编码器所能做到的最高水平，而是为了模仿Best设置在Flate2图书馆。
   */
  Best = "Best",
}

export interface CompressionOptionsType {
  /**
   * 压缩速度
   */
  speed: number;
  /**
   * 最小值
   */
  qualityMinimum: number;
  /**
   * 目标值
   */
  qualityTarget: number;
  /**
   * 设置为1.0以获得平滑的图像
   */
  ditheringLevel: number;
  /**
   * png编码器压缩等级
   */
  compression: Compression;
}

export const CompressionOptions = createContext<
  [
    CompressionOptionsType,
    React.Dispatch<React.SetStateAction<CompressionOptionsType>>
  ]
>(null as any);
