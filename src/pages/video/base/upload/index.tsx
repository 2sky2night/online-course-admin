import {
  CalculatorOutlined as HashIcon,
  DeploymentUnitOutlined as ProcessingIcon,
  LoadingOutlined as LoadingIcon,
  MergeCellsOutlined as MergeIcon,
  SelectOutlined as SelectFileIcon,
  SmileOutlined as DownIcon,
  UploadOutlined as UploadIcon,
} from "@ant-design/icons";
import type { StepProps } from "antd";
import { Steps } from "antd";
import { useMemo, useRef, useState } from "react";

import { Title } from "@/components";
import { useI18n } from "@/hooks";

import {
  DoneFile,
  HashFile,
  MergeFile,
  ProcessingFile,
  SelectFile,
  UploadFile,
} from "./components";
import { useStyles } from "./config";

export interface FileUploadData {
  /**
   * 文件hash
   */
  fileHash: string | null;
  /**
   * 文件id
   */
  fileId: null | number;
  /**
   * 选择的文件
   */
  file: File | null;
  /**
   * 文件的切片
   */
  fileChunks: Blob[];
}

/**
 * 视频上传页
 */
export default function VideoUploadPage() {
  const { t } = useI18n();
  const { styles } = useStyles();
  // 步骤
  const [current, setCurrent] = useState(0);
  /**
   * 存储的公共数据
   */
  const dataRef = useRef<FileUploadData>({
    file: null,
    fileChunks: [],
    fileHash: null,
    fileId: null,
  });
  /**
   * 步骤组件的配置项
   */
  const items = useMemo(() => {
    const list: StepProps[] = [
      {
        title: t("pages.video.base.upload.selectTitle", "选择文件"),
        icon: <SelectFileIcon />,
      },
      {
        title: t("pages.video.base.upload.hashTitle", "计算文件hash"),
        icon: <HashIcon />,
      },
      {
        title: t("pages.video.base.upload.uploadTitle", "上传切片文件"),
        icon: <UploadIcon />,
      },
      {
        title: t("pages.video.base.upload.mergeTitle", "视频合并"),
        icon: <MergeIcon />,
      },
      {
        title: t("pages.video.base.upload.processTitle", "视频处理&加密"),
        icon: <ProcessingIcon />,
      },
      {
        title: t("pages.video.base.upload.okTitle", "完成"),
        icon: <DownIcon />,
      },
    ];
    return list.map((item, index) => {
      if (index === current) {
        if (index !== list.length - 1) {
          item.status = "process";
          item.icon = <LoadingIcon />;
        }
      } else if (index < current) {
        item.status = "finish";
      } else {
        item.status = "wait";
      }
      return item;
    });
  }, [current]);
  /**
   * 更新ref数据
   */
  const updateDataRef = (action: keyof FileUploadData, value: string | number | File | Blob[]) => {
    // @ts-ignore
    dataRef.current[action] = value as any;
  };
  // 下一步
  const handleNext = () => setCurrent((v) => v + 1);
  // 去处理文件的步骤
  const handleGoProccess = () => setCurrent(4);
  return (
    <>
      <Title title={{ id: "pages.video.base.upload.title", dv: "视频上传" }} />
      <Steps size="small" current={current} items={items as any} />
      <div className={styles.container}>
        {current === 0 && <SelectFile onFinsh={handleNext} updateDataRef={updateDataRef} />}
        {current === 1 && (
          <HashFile onFinsh={handleNext} data={dataRef.current} updateDataRef={updateDataRef} />
        )}
        {current === 2 && (
          <UploadFile
            onFinsh={handleNext}
            onFastUpload={handleGoProccess}
            data={dataRef.current}
            updateDataRef={updateDataRef}
          />
        )}
        {current === 3 && (
          <MergeFile onFinsh={handleNext} data={dataRef.current} updateDataRef={updateDataRef} />
        )}
        {current === 4 && <ProcessingFile onFinsh={handleNext} data={dataRef.current} />}
        {current === 5 && <DoneFile fileId={dataRef.current.fileId} />}
      </div>
    </>
  );
}
