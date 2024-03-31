import type { ImageProps } from "antd";
import { Image as AntdImage } from "antd";

import { staticServerUrl } from "@/config";

interface Props {
  src: string;
  antdProps?: ImageProps;
}

/**
 * 检测是否为绝对路径的正则
 */
const isAbsolutePath = /^(?:\/|[a-zA-Z]:\\)/;

/**
 * 图片组件
 */
export default function Image({ src, antdProps }: Props) {
  if (src) {
    let formateSrc = src;
    if (isAbsolutePath.test(formateSrc)) {
      // 若非完整路径，则是内部链接，需要拼接url
      formateSrc = staticServerUrl + src;
    }
    return <AntdImage {...antdProps} src={formateSrc}></AntdImage>;
  } else {
    // 图片路径错误，直接渲染空的占位符
    return <span>-</span>;
  }
}
