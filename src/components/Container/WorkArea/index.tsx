import { useState, useEffect, useCallback, useContext } from "react";
import styles from "./index.module.scss";
import { invoke } from "@tauri-apps/api/tauri";
import DropContainer from "./DropContainer";
import * as dialog from "@tauri-apps/api/dialog";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import Works from "./Works";
import { CompressionOptions } from "@src/context/options";

let works: WorkListType[] = [];

/**
 * 工作区域
 * @returns
 */
export default function WorkArea() {
  const [workList, setWorkList] = useState<WorkListType[]>([]);

  const [options] = useContext(CompressionOptions);

  useEffect(() => {
    let filesInfoUnlistenFn: UnlistenFn;
    let progressUnlistenFn: UnlistenFn;
    let statusUnlistenFn: UnlistenFn;
    let errorUnlistenFn: UnlistenFn;

    listen(
      "files-info",
      ({ payload }: { payload: [number, string, string][] }) => {
        // console.log(payload);
        for (const [id, fileName, base64] of payload) {
          const work = works.find((w) => w.id === id);
          if (work) {
            work.fileName = fileName;
            work.base64 = base64;
          }
        }
        setWorkList(works);
      }
    ).then((_unlistenFn) => (filesInfoUnlistenFn = _unlistenFn));

    listen("progress", ({ payload }: { payload: [number, number] }) => {
      const list = [...works];
      const [id, progress] = payload;
      const li = list.find((w) => w.id === id);
      if (li) {
        li.progress = progress;
      }
      // console.log(work?.progress);
      setWorkList(list);
    }).then((_unlistenFn) => (progressUnlistenFn = _unlistenFn));

    listen(
      "status",
      ({ payload }: { payload: [number, string, number, number, number] }) => {
        const list = [...works];
        const [id, status, progress, originalSize, size] = payload;
        const li = list.find((w) => w.id === id);
        if (li) {
          li.progress = progress;
          li.status = status;
          li.originalSize = originalSize;
          li.size = size;
        }
        setWorkList(list);
      }
    ).then((_unlistenFn) => (statusUnlistenFn = _unlistenFn));

    listen("error", ({ payload }: { payload: [number, string] }) => {
      const list = [...works];
      const [id, err] = payload;
      const li = list.find((w) => w.id === id);
      if (li) {
        li.err = err;
      }
      setWorkList(list);
    }).then((_unlistenFn) => (errorUnlistenFn = _unlistenFn));

    return () => {
      if (filesInfoUnlistenFn) filesInfoUnlistenFn();
      if (progressUnlistenFn) progressUnlistenFn();
      if (statusUnlistenFn) statusUnlistenFn();
      if (errorUnlistenFn) errorUnlistenFn();
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
        if (selected) {
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
              err: "",
            });
          }

          invoke("compression_handle", {
            list: (selected as string[]).map((path, id) => [id, path]),
            speed: options.speed,
            qualityMinimum: options.qualityMinimum,
            qualityTarget: options.qualityTarget,
            ditheringLevel: options.ditheringLevel,
            compression: options.compression,
          }).then(() => console.log("Completed!"));
        }
      });
  }

  function clearWorkList() {
    works = [];
    setWorkList([]);
  }

  // useEffect(() => {
  //   console.log(workList);
  // }, [workList]);

  const area =
    workList.length === 0 ? (
      <DropContainer onOpenFile={openFile}></DropContainer>
    ) : (
      <Works workList={workList} clearWorkList={clearWorkList}></Works>
    );
  return <div className={classNames(styles.workArea, "grow")}>{area}</div>;
}
