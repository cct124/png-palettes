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
    };
  };
  optionsArea: {
    /**
     * 配置选项
     */
    options: {
      /**
       * 压缩速度
       */
      speed: string;
      /**
       * 1 - 10。
       * 更快的速度生成质量较低的图像，但对于实时生成图像可能有用。
       * 默认值是4。
       */
      speedTips: string;
      /**
       * 优化质量
       */
      quality: string;
      /**
       * 说明
       */
      qualityTips: string;
      /**
       * 质量最小值
       */
      qualityMinimum: string;
      /**
       * 质量目标值
       */
      qualityTarget: string;
      /**
       * 平滑参数
       */
      ditheringLevel: string;
      /**
       * 设置为1.0以获得平滑的图像
       */
      ditheringLevelTips: string;
      /**
       * 压缩等级
       */
      compression: string;
      /**
       * PNG编码器的压缩等级，默认是最小压缩
       */
      compressionTips: string;
    };
  };
  /**
   * 错误提示
   */
  error: {
    /**
     * 不能达到的最低质量
     */
    QualityTooLow: string;
    /**
     * 不支持的png颜色模式
     */
    Unsupported_Color_Mode: string;
    /**
     * 程序错误
     */
    ProgramError: string;
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
    },
  },
  optionsArea: {
    options: {
      speed: "压缩速度",
      speedTips:
        "1 - 10，更快的速度生成质量较低的图像，\r\n对于实时生成图像可能有用。 默认值是4",
      quality: "优化质量",
      qualityTips:
        "范围为0-100，大致类似于JPEG。\r\n如果无法满足最小质量，则量化将因错误而中止。\r\n默认值为最小0，最大100，这意味着尽力而为，并且永远不会中止过程。\r\n如果最大值小于100，则库将尝试使用更少的颜色。由于增加的抖动，颜色较少的图像并不总是更小。",
      qualityMinimum: "最小值",
      qualityTarget: "目标值",
      ditheringLevel: "平滑参数",
      ditheringLevelTips: "设置为1.0以获得平滑的图像",
      compression: "压缩等级",
      compressionTips: "PNG编码器的压缩等级，默认是最小压缩",
    },
  },
  error: {
    QualityTooLow: "无法达到所设置的最小质量，请减少优化质量的最小值",
    Unsupported_Color_Mode: "不支持的png颜色模式",
    ProgramError: "出错了！",
  },
};

export const I18n = createContext<
  [I18N_TYPE, React.Dispatch<React.SetStateAction<I18N_TYPE>>]
>(null as any);
