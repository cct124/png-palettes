import { createContext } from "react";

export interface I18N_TYPE {
  workArea: {
    /**
     * 上传文件
     */
    dropContainer: {
      /**
       * 选择文件
       */
      openFile: string;
    };
    /**
     * 工作列表
     */
    works: {
      /**
       * 文件数量
       */
      filesNum: string;
    };
  };
}

export const zhCN: I18N_TYPE = {
  workArea: {
    dropContainer: {
      openFile: "选择文件",
    },
    works: {
      filesNum: "文件数量",
    },
  },
};

export const I18n = createContext<
  [I18N_TYPE, React.Dispatch<React.SetStateAction<I18N_TYPE>>]
>(null as any);
