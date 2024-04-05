import { history } from "@umijs/max";
import { Progress } from "antd";
import { useEffect, useMemo, useState } from "react";
import { ArrayBuffer } from "spark-md5";

import { FileSize } from "@/enums";
import { useI18n } from "@/hooks";
import { globalErrorMsg } from "@/utils";

import type { FileUploadData } from "../..";

interface Props {
  onFinsh: () => void;
  data: FileUploadData;
  updateDataRef: (action: keyof Props["data"], value: Blob[] | string) => void;
}

/**
 * 计算hash
 */
export default function HashFile({ onFinsh, data, updateDataRef }: Props) {
  const { t } = useI18n();
  // 切片数量
  const [chunkSize, setChunkSize] = useState(0);
  // 已经计算的切片数量
  const [count, setCount] = useState(0);
  // 计算的百分比
  const percent = useMemo(() => {
    return Number(Math.round((count / chunkSize) * 100).toFixed(2));
  }, [chunkSize, count]);
  // 切片文件
  const getChunks = (file: File) => {
    const list: Blob[] = [];
    for (let i = 0; i < file.size; i += FileSize.FILE_CHUNK_SIZE) {
      list.push(file.slice(i, i + FileSize.FILE_CHUNK_SIZE));
    }
    return list;
  };

  // 计算hash
  const getHash = async (chunks: Blob[]) => {
    const spark = new ArrayBuffer();
    for (let i = 0; i < chunks.length; i++) {
      await new Promise<void>((r, j) => {
        const chunk = chunks[i];
        const reader = new window.FileReader();
        reader.onload = (e) => {
          spark.append((e.target as any).result);
          r();
        };
        reader.onerror = j;
        reader.readAsArrayBuffer(chunk);
      });
      setCount((v) => v + 1); // 计算的数量+1
    }
    return spark.end();
  };
  // 初次渲染
  useEffect(() => {
    if (!window.FileReader) {
      // TODO 兼容性兜底
      history.replace("/500");
      globalErrorMsg(t, "error", "global.api.cannot.supprt", "浏览器不支持此功能!");
    }
    if (data.file) {
      // 1.获取切片
      const chunks = getChunks(data.file);
      setChunkSize(chunks.length); // 获得切片总数
      updateDataRef("fileChunks", chunks); // 保存计算的切片
      // 2.计算hash
      getHash(chunks)
        .then((hash) => {
          updateDataRef("fileHash", hash);
          onFinsh(); // 进入下一步
        })
        .catch(() => {
          // TODO 错误兜底
          history.replace("/500");
          globalErrorMsg(t, "error", "global.action.error", "操作失败!");
        });
    } else {
      history.replace("/500");
      globalErrorMsg(t, "error", "global.action.error", "操作失败!");
    }
  }, []);

  return <Progress percent={percent}></Progress>;
}
