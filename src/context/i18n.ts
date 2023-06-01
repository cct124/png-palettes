import { createContext } from "react";

export interface LanguageType {
  id: number;
  name: string;
  data: I18N_TYPE;
}

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
      /**
       * 选择目录
       */
      openDir: string;
      /**
       * 拖拽png文件到此压缩
       */
      tips1: string;
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
    UIControl: {
      /**
       * 关于
       */
      about: string;
      /**
       * 语言
       */
      language: string;
    };
  };
  /**
   * 弹窗
   */
  dialog: {
    about: {
      title: string;
      content: string;
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
      openDir: "选择目录",
      tips1: "拖拽png文件到此压缩",
    },
    works: {
      filesNum: "文件数量",
      originalSize: "源文件",
      compressedSize: "压缩后",
      reductionSize: "减少",
      clearWorkList: "清除列表",
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
      compressionTips:
        "PNG编码器的压缩等级，default、fast、best。\r\nbest是最好的压缩但时间会更长",
    },
    UIControl: {
      about: "关于",
      language: "语言",
    },
  },
  dialog: {
    about: {
      title: "关于",
      content:
        "这是一个PNG图片压缩工具，选择所要压缩的图片时，软件将PNG图像的RGBA模式转为调色板模式，从而减小图像大小。\r\n如有别的问题请联系：huangdonghao1997@gmail.com",
    },
  },
  error: {
    QualityTooLow: "无法达到所设置的最小质量，请减少优化质量的最小值",
    Unsupported_Color_Mode: "不支持的png颜色模式",
    ProgramError: "出错了！",
  },
};

export const en: I18N_TYPE = {
  workArea: {
    dropContainer: {
      openFile: "Select file",
      openDir: "Select directory",
      tips1: "Drag and drop PNG files here to compress.",
    },
    works: {
      filesNum: "Number of files",
      originalSize: "source file",
      compressedSize: "after compression",
      reductionSize: "reduce",
      clearWorkList: "Clear list",
    },
  },
  optionsArea: {
    options: {
      speed: "Speed",
      speedTips:
        "1-10, generates lower quality images at a faster speed,\r\nwhich may be useful for real-time image generation. The default value is 4.",
      quality: "Quality",
      qualityTips:
        "The range is 0-100, similar to JPEG. If the minimum quality cannot be met,\r\nquantization will be aborted due to an error. The default value is the minimum of 0 and the maximum of 100,\r\nwhich means to do the best possible and never abort the process. If the maximum value is less than 100,\r\nthe library will attempt to use fewer colors. Due to increased dithering,\r\nimages with fewer colors are not always smaller.",
      qualityMinimum: "Min value",
      qualityTarget: "Target value",
      ditheringLevel: "Smoothing parameter",
      ditheringLevelTips: "Set to 1.0 to obtain a smooth image",
      compression: "Compression level",
      compressionTips:
        "PNG encoder's compression level, default, fast, best. Best is the best compression but takes longer.",
    },
    UIControl: {
      about: "About",
      language: "Language",
    },
  },
  dialog: {
    about: {
      title: "About",
      content:
        "This is a PNG image compression tool. When selecting the image to be compressed,\r\nthe software converts the PNG image's RGBA mode to a palette mode, thereby reducing the image size. \r\nIf you have any other questions, please contact: huangdonghao1997@gmail.com",
    },
  },
  error: {
    QualityTooLow:
      "Unable to achieve the set minimum quality, please reduce the minimum value of the optimized quality",
    Unsupported_Color_Mode: "Unsupported PNG color mode",
    ProgramError: "An error occurred!",
  },
};

export const I18n = createContext<
  [I18N_TYPE, React.Dispatch<React.SetStateAction<I18N_TYPE>>]
>(null as any);

/**
 * 支持的语言
 */
export const languages: LanguageType[] = [
  {
    id: 0,
    name: "中文简体",
    data: zhCN,
  },
  {
    id: 1,
    name: "English",
    data: en,
  },
];
