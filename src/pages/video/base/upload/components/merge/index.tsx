import { Flex, message,Spin } from "antd";
import { useEffect, useRef } from "react";

import { PollingTime } from "@/constants";
import { useI18n } from "@/hooks";
import {
  uploadVideoControllerGetVideoMergeProgress as apiMergeChunkProgress,
  uploadVideoControllerMergeChunk as apiMergeChunk,
} from "@/services/go_study_server/uploadVideo";
import { globalErrorMsg } from "@/utils";

import type { FileUploadData } from "../..";

type MergeChunk = API.ResponseDto & {
  data: API.RMergeChunk;
};

type MergeChunkProgress = API.ResponseDto & {
  data: API.RGetVideoMergeProgress;
};

interface Props {
  onFinsh: () => void;
  data: FileUploadData;
  updateDataRef: (action: keyof Props["data"], value: number) => void;
}

export default function MergeFile({ onFinsh, data, updateDataRef }: Props) {
  const { t } = useI18n();
  const timer = useRef<number | null>(null);
  /**
   * 开始合并切片
   */
  const toMergeChunk = (hash: string, chunkCount: number) => {
    return apiMergeChunk({ file_hash: hash, chunk_count: chunkCount }).then((r) => {
      const result = r as MergeChunk;
      return result.data.merge_key;
    });
  };
  /**
   * 轮询查询合并情况
   */
  const getMergeProgress = (mergeKey: string) => {
    function getProgress() {
      apiMergeChunkProgress({
        merge_key: mergeKey,
      }).then((r) => {
        const { data } = r as MergeChunkProgress;
        if (data.file_id !== undefined) {
          // 合并完成
          message.success(t("pages.video.base.upload.merge.ok", "合并文件成功!"));
          // 保存file_id
          updateDataRef("fileId", data.file_id);
          // 进行下一步
          onFinsh();
        } else {
          // 还在合并中，延迟多少秒后再去查询
          timer.current = window.setTimeout(getProgress, PollingTime);
        }
      });
    }
    getProgress();
  };
  /**
   * 停止计时器
   */
  const stopTimer = () => {
    const timeId = timer.current;
    if (timeId !== null) {
      window.clearTimeout(timeId);
    }
  };
  /**
   * 合并文件的全部逻辑
   */
  const handleMerge = async (hash: string, chunkCount: number) => {
    const mergeKey = await toMergeChunk(hash, chunkCount);
    getMergeProgress(mergeKey);
  };
  // 初次渲染
  useEffect(() => {
    if (data.fileHash && data.fileChunks.length) {
      handleMerge(data.fileHash, data.fileChunks.length);
    } else {
      globalErrorMsg(t, "error", "global.action.error", "操作失败!");
    }
    return stopTimer;
  }, []);

  return (
    <Flex justify="center" vertical align="center">
      <Spin size="large" />
      <span style={{ marginTop: "10px" }}>
        {t("pages.video.base.upload.merging", "正在合并切片文件中....")}{" "}
      </span>
    </Flex>
  );
}
