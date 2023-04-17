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
}
