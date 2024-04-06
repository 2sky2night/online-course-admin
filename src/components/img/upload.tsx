import { LoadingOutlined as LoadingIcon, PlusOutlined as UploadIcon } from "@ant-design/icons";
import type { GetProp, UploadProps } from "antd";
import { Button, message,Upload } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

import { AllowedImageExtensions } from "@/constants";
import { useI18n } from "@/hooks";

import Image from "./image";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface Props {
  /**
   * 图片最大大小(字节)
   */
  maxSize: number;
  /**
   * 校验成功后会调用的请求上传函数，返回的是url，提供完整链接，用来预览图片
   * @returns
   */
  request: (file: File) => Promise<string>;
}

export interface UploadImgInst {
  /**
   * 重置选择的文件
   */
  handleReset: () => void;
}

interface UploadRequestOption {
  file: File;
}

/**
 * 上传图片组件
 * 1.验证图片格式
 * 2.验证图片大小
 * 3.重置选择
 * @returns
 */
const UploadImg = forwardRef<UploadImgInst, Props>(({ maxSize, request }, ref) => {
  const { t } = useI18n();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // 选择文件后会验证图片
  const beforeUpload = (file: FileType) => {
    const typeOk = AllowedImageExtensions.includes(file.type);
    if (!typeOk) {
      message.warning(t("global.img.type.error", "选择的图片格式不支持!"));
      return false;
    }
    const sizeOk = file.size <= maxSize;
    if (!sizeOk) {
      message.warning(t("global.img.size.error", "选择的图片过大!"));
      return false;
    }
    return true;
  };
  // 验证通过发送请求
  const handleRequest = async ({ file }: UploadRequestOption) => {
    setLoading(true);
    try {
      const url = await request(file);
      setImageUrl(url);
    } finally {
      setLoading(false);
    }
  };
  // 重置请求
  const handleReset = () => {
    setImageUrl(null);
  };
  useImperativeHandle(
    ref,
    () => {
      return { handleReset };
    },
    [],
  );
  return imageUrl ? (
    <>
      <Image src={imageUrl} antdProps={{ height: "300px" }} />
      <Button type="primary" onClick={handleReset} style={{ marginTop: "10px", display: "block" }}>
        {t("global.reset.select", "重新选择")}
      </Button>
    </>
  ) : (
    <Upload showUploadList={false} beforeUpload={beforeUpload} customRequest={handleRequest as any}>
      <Button htmlType="button" size="large">
        {loading ? <LoadingIcon /> : <UploadIcon />}
      </Button>
    </Upload>
  );
});

export default UploadImg;
