import type { RequestOptions } from "@umijs/max";
import { Button, Flex, message,Spin } from "antd";
import { useEffect, useRef,useState } from "react";

import { useI18n } from "@/hooks";
import {
  uploadVideoControllerChunkUploadProgress as apiChunkUploadProgress,
  uploadVideoControllerFastUpload as apiFastUpload,
  uploadVideoControllerUploadChunk as apiUploadChunk,
} from "@/services/go_study_server/uploadVideo";
import { globalErrorMsg } from "@/utils";

import type { FileUploadData } from "../..";
import { useStyles } from "./config";

type FastUploadResponse = API.ResponseDto & { data: API.RFastUploadDto };

interface Props {
  /**
   * 上传文件结束
   */
  onFinsh: () => void;
  /**
   * 秒传文件成功
   */
  onFastUpload: () => void;
  data: FileUploadData;
  updateDataRef: (action: keyof Props["data"], value: string | number) => void;
}

/**
 * 操作步骤
 */
enum Action {
  /**
   * 快传
   */
  FAST_UPLOAD = 0,
  /**
   * 获取上传进度
   */
  CHUNK_GO_ON = 1,
  /**
   * 上传文件中...
   */
  CHUNK_UPLOADING = 2,
}

/**
 * 最大请求并发数量
 */
const RequestMAX = 6;

/**
 * 上传切片
 * @param fileHash 哈希
 * @param chunk  切片文件
 * @param chunkHash 切片索引
 * @param controller 取消请求的控制器
 */
function uploadChunkFile(
  fileHash: string,
  chunk: Blob,
  chunkHash: number,
  controller: AbortController,
) {
  return apiUploadChunk(
    {
      file_hash: fileHash,
      chunk_hash: chunkHash,
    } as any,
    chunk as File,
    {
      signal: controller.signal,
    } as RequestOptions,
  );
}

/**
 * 上传文件
  1.秒传
  2.续传
  3.暂停/继续
  4.并发上传切片文件
 */
export default function UploadFile({ onFinsh, data, updateDataRef, onFastUpload }: Props) {
  const { t } = useI18n();
  const { styles } = useStyles();
  // 上传文件的步骤
  const [current, setCurrent] = useState(Action.FAST_UPLOAD);
  // 是否暂停上传
  const [isPause, setIsPause] = useState(false);
  /**
   * 存储的所有abort
   */
  const controllerRefs = useRef<AbortController[]>([]);
  /**
   * 判断秒传
   */
  const fastUpload = (hash: string) => {
    return apiFastUpload({ file_hash: hash }).then((r) => {
      const { data } = r as FastUploadResponse;
      if (data.done) {
        // 秒传成功
        // 结束后续的流程
        message.success(t("pages.video.base.upload.fastUploadOk", "秒传成功!"));
        // 更新file_id的数据，用来与发布视频页面通信
        updateDataRef("fileId", data.file_id as number);
        onFastUpload();
      } else {
        // 秒传失败
        // 走续传的逻辑
        setCurrent(Action.CHUNK_GO_ON); // 步骤:走续传的操作
      }
      return data.done;
    });
  };
  /**
   * 续传文件
   * @returns 返回已经上传的切片索引
   */
  const checkUploadProgress = (hash: string) => {
    return apiChunkUploadProgress({
      file_hash: hash,
    }).then(({ data: list }) => {
      setCurrent(Action.CHUNK_UPLOADING); // 步骤:进入上传切片文件的步骤
      return list;
    });
  };
  /**
   * 记录切片上传的状态
   */
  const [chunks, setChunks] = useState<boolean[]>([]);
  /**
   * 切片上传
   * @param chunks 切片
   * @param hash hash
   * @param uploadedChunksIndex 已经上传的切片索引
   */
  const toUploadChunks = async (chunks: Blob[], hash: string, uploadedChunksIndex: number[]) => {
    /**
     * 请求池
     */
    const pool: Promise<API.ResponseEmptyDto>[] = [];
    /**
     * 过滤出需要上传的文件
     */
    const uploadChunks = chunks
      .map((chunk, index) => ({ chunk, index })) // 保存所有切片的索引
      .filter((_, index) => !uploadedChunksIndex.includes(index)); // 过滤出已经上传过的切片
    // 记录切片上传状态
    setChunks(
      chunks.map((_, index) => {
        return uploadedChunksIndex.includes(index);
      }),
    );
    for (let index = 0; index < uploadChunks.length; ) {
      if (pool.length < RequestMAX) {
        const uploadChunk = uploadChunks[index];
        const controller = new window.AbortController();
        controllerRefs.current.push(controller);
        const item = uploadChunkFile(hash, uploadChunk.chunk, uploadChunk.index, controller);
        pool.push(item);
        item.then(() => {
          // 切片上传成功
          const delIndex = pool.findIndex((v) => v === item);
          if (delIndex !== -1) {
            pool.splice(delIndex, 1);
            setChunks((v) => {
              // 设置上传状态
              v[uploadChunk.index] = true;
              return [...v];
            });
          }
        });
        index++; // 这里很关键，不能把index++放在for的步进中（到导致等待的切片会被跳过上传），因为Promise.race(pool)这里如果放任他i++，就会导致等待的那个切片被跳过上传，进入下一次循环中
      } else {
        await Promise.race(pool); // 等待请求池有一个请求完成再走后续流程
      }
    }
    return Promise.all(pool); // 剩余的请求完成
  };
  /**
   * 暂停/继续
   */
  const handleTogglePause = async () => {
    if (isPause) {
      // 继续
      if (data.fileChunks.length && data.fileHash) {
        setIsPause((v) => !v);
        const { fileChunks: chunks, fileHash: hash } = data;
        // 2.续传文件
        const uploadedChunksIndex = await checkUploadProgress(hash);
        // 3.切片上传文件
        await toUploadChunks(chunks, hash, uploadedChunksIndex || []);
        message.success(t("pages.video.base.upload.ok", "上传所有切片文件成功!"));
        // 进入下一步
        onFinsh();
      } else {
        globalErrorMsg(t, "error", "global.action.error", "操作失败!");
      }
    } else {
      // 暂停
      setIsPause((v) => !v);
      // 激活所有的控制器
      controllerRefs.current.forEach((controller) => controller.abort());
      // 清空所有控制器
      controllerRefs.current.length = 0;
    }
  };

  /**
   * 所有上传的逻辑
   */
  const handleUpload = async (chunks: Blob[], hash: string) => {
    // 1.秒传文件
    const isFast = await fastUpload(hash);
    if (isFast) return; // 秒传成功
    // 2.续传文件
    const uploadedChunksIndex = await checkUploadProgress(hash);
    // 3.切片上传文件
    await toUploadChunks(chunks, hash, uploadedChunksIndex || []);
    message.success(t("pages.video.base.upload.ok", "上传所有切片文件成功!"));
    // 进入下一步
    onFinsh();
  };
  // 执行所有上传的操作
  useEffect(() => {
    if (data.fileChunks.length && data.fileHash) {
      handleUpload(data.fileChunks, data.fileHash);
    } else {
      globalErrorMsg(t, "error", "global.action.error", "操作失败!");
    }
  }, []);
  return (
    <div>
      {current === Action.FAST_UPLOAD && (
        <Flex justify="center" align="center" vertical>
          <Spin size="large" />
          <span style={{ marginTop: "10px" }}>
            {t("pages.video.base.upload.fastUploading", "正在秒传文件...")}
          </span>
        </Flex>
      )}
      {current === Action.CHUNK_GO_ON && (
        <Flex justify="center" align="center" vertical>
          <Spin size="large" />
          <span style={{ marginTop: "10px" }}>
            {t("pages.video.base.upload.chunkGoOnloading", "正在获取上传进度...")}
          </span>
        </Flex>
      )}
      {current === Action.CHUNK_UPLOADING && (
        <>
          <Flex justify="space-between">
            <span>{t("pages.video.base.upload.loading", "上传进度")}</span>
            <Button type="primary" danger={!isPause} onClick={handleTogglePause}>
              {isPause
                ? t("pages.video.base.upload.goon", "继续")
                : t("pages.video.base.upload.pause", "暂停")}
            </Button>
          </Flex>
          <div className={styles.boxContainer}>
            {chunks.map((item, index) => {
              return (
                <div className={styles.box} key={index}>
                  {item ? (
                    <div className={styles.successBox}></div>
                  ) : (
                    <div className={styles.loadingBox}></div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
