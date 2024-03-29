import { useState, useEffect, useCallback, useContext } from "react";
import styles from "./index.module.scss";
import { invoke } from "@tauri-apps/api/tauri";
import DropContainer from "./DropContainer";
import * as dialog from "@tauri-apps/api/dialog";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import Works from "./Works";
import { CompressionOptions } from "@src/context/options";
import { WorkStatus } from "@src/context/workList";
let works: WorkListType[] = [];

/**
 * 工作区域
 * @returns
 */
export default function WorkArea() {
  const [workList, setWorkList] = useState<WorkListType[]>([]);

  const [options] = useContext(CompressionOptions);

  const complete = useCallback(() => {
    const list = workList.filter((w) => w.status !== WorkStatus.ERROR);
    return list.length === 0 || list.every((w) => w.status === WorkStatus.END);
  }, [workList]);

  useEffect(() => {
    let filesInfoUnlistenFn: UnlistenFn;
    let progressUnlistenFn: UnlistenFn;
    let statusUnlistenFn: UnlistenFn;
    let errorUnlistenFn: UnlistenFn;

    listen(
      "files-info",
      ({ payload }: { payload: [number, string, string, string][] }) => {
        if (works.length === 0) {
          for (const [id, fileName, base64, path] of payload) {
            works.push({
              id,
              fileName,
              path,
              status: "INIT",
              progress: 0,
              originalSize: 0,
              size: 0,
              base64,
              err: "",
            });
          }
          setWorkList(works);
        } else {
          for (const [id, fileName, base64] of payload) {
            const work = works.find((w) => w.id === id);
            if (work) {
              work.fileName = fileName;
              work.base64 = base64;
            }
          }
          setWorkList(works);
        }
      }
    ).then((_unlistenFn) => (filesInfoUnlistenFn = _unlistenFn));

    listen("progress", ({ payload }: { payload: [number, number] }) => {
      const list = [...works];
      const [id, progress] = payload;
      const li = list.find((w) => w.id === id);
      if (li) {
        li.progress = progress;
      }
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

  /**
   * 拖拽文件
   * @param selected
   */
  function onFileDrop(selected: string[]) {
    if (selected && selected.length !== 0) {
      invoke("compression_handle", {
        isFile: false,
        list: (selected as string[]).map((path, id) => [id, path]),
        speed: options.speed,
        qualityMinimum: options.qualityMinimum,
        qualityTarget: options.qualityTarget,
        ditheringLevel: options.ditheringLevel,
        compression: options.compression,
      }).then(() => console.log("Completed!"));
    }
  }

  /**
   * 打开文件
   */
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
            isFile: true,
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

  // 打开目录
  async function openDir() {
    dialog
      .open({
        directory: true,
      })
      .then((select) => {
        invoke("compression_handle", {
          isFile: false,
          list: [[0, select]],
          speed: options.speed,
          qualityMinimum: options.qualityMinimum,
          qualityTarget: options.qualityTarget,
          ditheringLevel: options.ditheringLevel,
          compression: options.compression,
        }).then(() => console.log("Completed!"));
      });
  }

  function clearWorkList() {
    works = [];
    setWorkList([]);
  }

  const area =
    workList.length === 0 ? (
      <DropContainer
        onOpenFile={openFile}
        onOpenDir={openDir}
        onFileDrop={onFileDrop}
        workList={workList}
      ></DropContainer>
    ) : (
      <Works
        workList={workList}
        clearWorkList={clearWorkList}
        complete={complete()}
      ></Works>
    );
  return <div className={classNames(styles.workArea, "grow")}>{area}</div>;
}
