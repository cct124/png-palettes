import { createContext } from "react";

export interface WorkListType {
  /**
   * 工作任务id
   */
  id: number;
  /**
   * 工作路径
   */
  path: string;
  /**
   * 工作状态
   */
  status: WorkStatus;
  /**
   * 工作进度
   */
  progress: number;
  /**
   * 源文件大小
   */
  originalSize: string;
  /**
   * 压缩后文件大小
   */
  size: number;
}

export enum WorkStatus {
  INIT = "INIT",
  WAIT = "WAIT",
  END = "END",
  UNHANDLED = "UNHANDLED",
}

export const WorkList = createContext<WorkListType[]>([]);
