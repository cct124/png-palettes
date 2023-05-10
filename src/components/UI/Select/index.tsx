import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { ThemeStateContext } from "@src/context/theming";

/**
 * 选项配置
 */
export interface SelectOption<T> {
  /**
   * 选项的数据
   */
  value: T;
  /**
   * 选项的名称
   */
  label: string;
}

/**
 * 组件的大小
 */
export enum SelectSize {
  /**
   * 默认的
   */
  DEFAULT = "default",
}

/**
 * 选择器组件
 * @param param0.options 选项配置
 * @param param0.value 绑定值
 * @param param0.setValue 更改值函数
 * @param param0.size 组件的大小
 * @returns
 */
export default function Select<T>({
  options,
  value,
  setValue,
  size = SelectSize.DEFAULT,
}: {
  options: SelectOption<T>[];
  value: T;
  setValue: (value: T) => void;
  size?: SelectSize;
}) {
  const [theme] = useContext(ThemeStateContext);
  /**
   * 获取默认的标签
   */
  const label = useCallback(() => {
    const t = options.find((o) => o.value === value);
    return t ? t.label : "";
  }, [value]);

  const [expansion, setExpansion] = useState(false);
  const selectEle = useRef<HTMLDivElement>(null);

  const [bottom, setBottom] = useState(0);

  const optionsBox = expansion ? (
    <div className={classNames(styles.options)} style={{ top: bottom }}>
      {options.map((o) => (
        <div
          className={classNames(styles.option)}
          key={o.label}
          onClick={() => select(o)}
        >
          {o.label}
        </div>
      ))}
    </div>
  ) : (
    ""
  );

  useEffect(() => {
    if (selectEle.current) {
      setBottom(selectEle.current.getBoundingClientRect().bottom + 5);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", bule);
    return () => {
      document.removeEventListener("click", bule);
    };
  }, []);

  function select(option: SelectOption<T>) {
    setValue(option.value);
    setExpansion(false);
  }

  function bule() {
    setExpansion(false);
  }

  function self(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
  }

  return (
    <div
      className={classNames(
        styles.select,
        styles[size],
        styles[theme],
        styles[expansion ? "expansion" : ""],
        "flex-jcfs-aic tran-uni relative"
      )}
      onClick={self}
      ref={selectEle}
    >
      <input
        className={styles.input}
        type="text"
        tabIndex={0}
        placeholder="Select"
        readOnly={true}
        value={label()}
        onClick={() => setExpansion(!expansion)}
        // onBlur={() => setExpansion(false)}
      />
      {optionsBox}
    </div>
  );
}
