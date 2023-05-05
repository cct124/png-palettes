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
      /**
       * 源文件
       */
      originalSize: string;
      /**
       * 压缩后
       */
      compressedSize: string;
      /**
       * 减少
       */
      reductionSize: string;
      /**
       * 删除列表
       */
      clearWorkList: string;
      work: {
        /**
         * 不支持的图像格式
         */
        unhandled: string;
      };
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
      originalSize: "源文件",
      compressedSize: "压缩后",
      reductionSize: "减少",
      clearWorkList: "删除列表",
      work: {
        unhandled: "不支持的图像格式",
      },
    },
  },
};

export const I18n = createContext<
  [I18N_TYPE, React.Dispatch<React.SetStateAction<I18N_TYPE>>]
>(null as any);
