/**
 * 将 css class 名合并以空格分隔的形式输出
 * @param args
 * @returns
 */
export function classNames(...args: (string | undefined)[]) {
  return args.every((str) => str === undefined)
    ? undefined
    : args.filter((str) => typeof str === "string" && str !== "").join(" ");
}

/**
 * 生成递增数字数组
 * @param start 数组第一项值
 * @param end 数组最后一项值
 * @returns
 */
export function genArr(start: number, end: number): number[] {
  return Array.from(new Array(end + 1).keys()).slice(start);
}
