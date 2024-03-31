import { UserOutlined } from "@ant-design/icons";
import type { AvatarProps } from "antd";
import { Avatar as AntdAvatar } from "antd";

import { staticServerUrl } from "@/config";

interface Props {
  /**
   * 图片的连接
   */
  src?: string;
  /**
   * 穿透antd的属性
   */
  antdProps?: AvatarProps;
}

/**
 * 头像组件
 */
export default function Avatar({ src, antdProps }: Props) {
  if (src) {
    const formateSrc = staticServerUrl + src;
    return <AntdAvatar {...antdProps} src={formateSrc}></AntdAvatar>;
  } else {
    return <AntdAvatar icon={<UserOutlined />} {...antdProps} />;
  }
}
