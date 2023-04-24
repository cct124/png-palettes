import styles from "./index.module.scss";
import Work from "./Work";

export default function Works({ workList }: { workList: WorkListType[] }) {
  return (
    <div className={classNames(styles.works, "flex flex-column w-100p h-100p")}>
      <div className={classNames(styles.top, "grow")}>
        {workList.map((w) => (
          <Work work={w} key={w.id}></Work>
        ))}
      </div>
      <div></div>
    </div>
  );
}
