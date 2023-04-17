import styles from "./index.module.scss";
import ThemeSwitch from "./ThemeSwitch";

export default function UIControl() {
  return (
    <div className={classNames(styles.UIControl, "w-100p flex-jcfe-aic pad-lr-10")}>
      <ThemeSwitch></ThemeSwitch>
    </div>
  );
}
