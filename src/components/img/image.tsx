import type { ImageProps } from "antd";
import { Image as AntdImage } from "antd";

import { staticServerUrl } from "@/config";

interface Props {
  src: string;
  antdProps?: ImageProps;
}

/**
 * 图片组件
 */
export default function Image({ src, antdProps }: Props) {
  const formateSrc = staticServerUrl + src;
  return <AntdImage {...antdProps} src={formateSrc}></AntdImage>;
}
