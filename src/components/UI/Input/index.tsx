import { useContext } from "react";
import styles from "./index.module.scss";
import { ThemeStateContext } from "@src/context/theming";

/**
 * 组件的大小
 */
export enum InputSize {
  /**
   * 默认的
   */
  DEFAULT = "default",
}

export default function Input<T>({
  value,
  setValue,
  type,
  max,
  min,
  step,
  size = InputSize.DEFAULT,
  className,
  onChange,
}: {
  type?: React.HTMLInputTypeAttribute;
  max?: number;
  min?: number;
  size?: InputSize;
  step?: number;
  value?: string | number | readonly string[];
  setValue: (value: T) => void;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const [theme] = useContext(ThemeStateContext);

  function onChangeHandle(ev: React.ChangeEvent<HTMLInputElement>) {
    setValue(valueType(ev.target.value) as T);
    if (onChange) onChange(ev);
  }

  function onBlurHandle(ev: React.FocusEvent<HTMLInputElement, Element>) {
    if (type === "number") setValue(Number(ev.target.value) as T);
  }

  function valueType(value: string) {
    if (type === "number") {
      const _value = Number(value);
      if (min !== undefined && min > _value) return min;
      if (max !== undefined && max < _value) return max;
      return value;
    }
    return value;
  }

  return (
    <input
      value={value}
      className={classNames(
        styles.input,
        styles[theme],
        styles[size],
        className
      )}
      max={max}
      min={min}
      type={type}
      onChange={onChangeHandle}
      onBlur={onBlurHandle}
      step={step}
    />
  );
}
