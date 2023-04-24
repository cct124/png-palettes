import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { invoke } from "@tauri-apps/api/tauri";
import DropContainer from "./DropContainer";
import * as dialog from "@tauri-apps/api/dialog";
import { listen } from "@tauri-apps/api/event";
import Works from "./Works";

const works: WorkListType[] = [];

/**
 * 工作区域
 * @returns
 */
export default function WorkArea() {
  const [workList, setWorkList] = useState<WorkListType[]>([]);

  useEffect(() => {
    let unlistenFn: any;
    listen(
      "file-info",
      ({ payload }: { payload: [number, string, string] }) => {
        const [id, fileName, base64] = payload;
        console.log(id, fileName, base64)
        for (const iter of works) {
          if (iter.id === id) {
            iter.fileName = fileName;
            iter.base64 = base64;
          }
        }
        setWorkList(works);
      }
    ).then((_unlistenFn) => (unlistenFn = _unlistenFn));
    return () => {
      if (unlistenFn) unlistenFn();
    };
  }, []);

  function openFile() {
    dialog
      .open({
        multiple: true,
        filters: [
          {
            name: "Image",
            extensions: ["png"],
          },
        ],
      })
      .then((selected: unknown) => {
        for (const [id, path] of (selected as string[]).entries()) {
          works.push({
            id,
            fileName: "",
            path,
            status: "INIT",
            progress: 0,
            originalSize: 0,
            size: 0,
            base64: "",
          });
        }
        invoke("compression_handle", {
          list: (selected as string[]).map((path, id) => [id, path]),
        }).then(() => console.log("Completed!"));
      });
  }

  useEffect(() => {
    console.log(workList);
  }, [workList]);

  const area =
    workList.length === 0 ? (
      <DropContainer onOpenFile={openFile}></DropContainer>
    ) : (
      <Works workList={workList}></Works>
    );
  return <div className={classNames(styles.workArea, "grow")}>{area}</div>;
}
