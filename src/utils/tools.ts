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
