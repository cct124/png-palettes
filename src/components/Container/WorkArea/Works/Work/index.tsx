import { useContext } from "react";
import styles from "./index.module.scss";
import Img, { ObjectFit } from "@src/components/UI/Img";
import { ReactComponent as EmptyImg } from "@src/assets/icons/svg/empty_img.svg";
import { ThemeStateContext } from "@src/context/theming";

export default function Work({ work }: { work: WorkListType }) {
  const [theme] = useContext(ThemeStateContext);
  const img =
    work.base64 === "" ? (
      EmptyImg({})
    ) : (
      <Img src={work.base64} objectFit={ObjectFit.CONTAIN} />
    );
  return (
    <div className={classNames(styles.work, styles[theme])}>
      <div className={classNames(styles.preview, "flex-center")}>{img}</div>
      <p className={classNames(styles.path)}>{work.path}</p>
    </div>
  );
}
