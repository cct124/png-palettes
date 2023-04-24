import styles from "./index.module.scss";

export enum ObjectFit {
  /**
   * 被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“黑边”。
   */
  CONTAIN = "contain",
  /**
   * 被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。
   */
  COVER = "cover",
  /**
   * 被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。
   */
  FILL = "fill",
  /**
   * 被替换的内容将保持其原有的尺寸。
   */
  NONE = "none",
}

export default function Img({
  src,
  className,
  alt,
  objectFit,
}: {
  src: string;
  className?: string;
  alt?: string;
  objectFit?: ObjectFit;
}) {
  return (
    <img
      className={classNames(
        styles.img,
        objectFit ? styles[objectFit] : "",
        className
      )}
      src={src}
      alt={alt}
    />
  );
}
