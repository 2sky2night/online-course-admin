import { Flex, message,Spin } from "antd";
import { useEffect, useRef, useState } from "react";

import { PollingTime } from "@/constants";
import { useI18n } from "@/hooks";
import {
  uploadVideoControllerGetFileVideos as apiFilevideos,
  uploadVideoControllerGetVideoProcessingProgress as apiProcessingProgress,
  uploadVideoControllerToDoVideoProcessing as apiProcessing,
} from "@/services/go_study_server/uploadVideo";
import { globalErrorMsg } from "@/utils";

import type { FileUploadData } from "../..";

interface Props {
  onFinsh: () => void;
  data: FileUploadData;
}

type ProcessingResponse = API.ResponseDto & { data: API.RToDoVideoProcessing };

type ProcessingProgressResponse = API.ResponseDto & { data: API.RGetVideoProcessingProgress };

type FileVideosResponse = API.ResponseDto & {
  data: API.RGetFileVideos;
};

/**
 * 处理文件
 * // TODO 国际化支持
 */
export default function ProcessingFile({ data, onFinsh }: Props) {
  const { t } = useI18n();
  const [tips, setTips] = useState("");
  const timer = useRef<number | null>(null);
  /**
   * 开始对视频进行处理
   * @param fileId
   */
  const processing = (fileId: number) => {
    return apiProcessing({
      fid: fileId,
    }).then((r) => {
      const result = r as ProcessingResponse;
      return result.data.processing_key;
    });
  };
  /**
   * 轮询查询视频处理进度
   * @param processingKey
   */
  const getProcssing = (processingKey: string) => {
    function start() {
      apiProcessingProgress({
        processing_key: processingKey,
      }).then((r) => {
        const { data } = r as ProcessingProgressResponse;
        if (data.done) {
          // 处理完成
          message.success(t("pages.video.base.upload.processing.ok", "处理文件成功!"));
          onFinsh(); // 步骤：进入完成步骤
        } else {
          // 在处理中...
          if (data.tips) {
            setTips(data.tips);
          }
          timer.current = window.setTimeout(start, PollingTime);
        }
      });
    }
    start();
  };
  /**
   * 获取视频源
   * @param fileId
   */
  const getVideos = (fileId: number) => {
    return apiFilevideos({ fid: fileId }).then((r) => {
      const { data } = r as FileVideosResponse;
      if (data.m3u8?.length) {
        return true;
      } else {
        return false;
      }
    });
  };
  /**
   * 清除定时器
   */
  const stopTimer = () => {
    const timeId = timer.current;
    if (timeId !== null) {
      window.clearTimeout(timeId);
    }
  };
  /**
   * 处理视频的逻辑
   * @param fileId
   */
  const handleProcessing = async (fileId: number) => {
    const hasSource = await getVideos(fileId);
    if (hasSource) {
      // 有视频源，直接成功
      onFinsh();
    } else {
      // 无视频源，需要处理视频
      const processingKey = await processing(fileId);
      getProcssing(processingKey);
    }
  };
  // 初次渲染
  useEffect(() => {
    if (data.fileId) {
      handleProcessing(data.fileId);
    } else {
      globalErrorMsg(t, "error", "global.action.error", "操作失败!");
    }
    return stopTimer;
  }, []);

  return (
    <Flex justify="center" vertical align="center">
      <Spin size="large" />
      <span style={{ marginTop: "10px" }}>{tips}</span>
    </Flex>
  );
}
