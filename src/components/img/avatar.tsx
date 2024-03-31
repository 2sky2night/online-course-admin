import { UserOutlined } from "@ant-design/icons";
import { AvatarProps, Space } from "antd";
import { Avatar as AntdAvatar } from "antd";

import { staticServerUrl } from "@/config";

interface Props {
  /**
   * 图片的链接
   */
  src?: string;
  /**
   * 穿透antd的属性
   */
  antdProps?: AvatarProps;
  /**
   * 用户名称(若传入了就会顺带渲染用户名称)
   */
  username?: string;
}

/**
 * 检测是否为绝对路径的正则
 */
const isAbsolutePath = /^(?:\/|[a-zA-Z]:\\)/;

/**
 * 头像组件
 */
export default function Avatar({ src, antdProps, username }: Props) {
  if (src) {
    let formateSrc = src;
    if (isAbsolutePath.test(formateSrc)) {
      // 若非完整路径，则是内部链接，需要拼接url
      formateSrc = staticServerUrl + src;
    }
    if (username) {
      return (
        <Space>
          <AntdAvatar {...antdProps} src={formateSrc}></AntdAvatar>
          <span>{username}</span>
        </Space>
      );
    }
    return <AntdAvatar {...antdProps} src={formateSrc}></AntdAvatar>;
  } else {
    if (username) {
      return (
        <Space>
          <AntdAvatar icon={<UserOutlined />} {...antdProps} />
          <span>{username}</span>
        </Space>
      );
    }
    return <AntdAvatar icon={<UserOutlined />} {...antdProps} />;
  }
}
