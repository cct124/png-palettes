/**
 * 将 css class 名合并以空格分隔的形式输出
 */
function classNames(...args: (string | undefined)[]): string | undefined;

interface Window {
  /**
   * 将 css class 名合并以空格分隔的形式输出
   * @param args
   * @returns
   */
  classNames: classNames;
  $local: { [key: string]: any };
}

interface WorkListType {
  /**
   * 工作任务id
   */
  id: number;
  /**
   * 文件名称
   */
  fileName: string;
  /**
   * 工作路径
   */
  path: string;
  /**
   * 工作状态
   */
  status: string;
  /**
   * 工作进度
   */
  progress: number;
  /**
   * 源文件大小
   */
  originalSize: number;
  /**
   * 压缩后文件大小
   */
  size: number;
  /**
   * base64数据
   */
  base64: string;
  /**
   * 错误类型
   */
  err: string;
}
