import { Space } from "antd";

import { Avatar, Image, InfoForm } from "@/components";
import type { FormItem } from "@/components/form/info-form";
import { VideoInfo } from "@/types";

interface Props {
  data: VideoInfo;
}

/**
 * 视频信息表单
 */
export default function VideoInfoForm({ data }: Props) {
  const items: FormItem[] = [
    {
      label: {
        id: "global.title",
        dv: "标题",
      },
      value: data.video_name,
    },
    {
      label: {
        id: "pages.video.base.info.desciption",
        dv: "简介",
      },
      value: data.description,
      render(value: string | null) {
        return <span>{value || "-"}</span>;
      },
    },
    {
      label: {
        id: "global.cover",
        dv: "封面",
      },
      value: data.video_cover,
      render(value: string) {
        return <Image src={value} antdProps={{ height: "300px" }} />;
      },
    },
    {
      label: {
        id: "global.duration",
        dv: "时长",
      },
      value: data.duration,
    },
    {
      label: {
        id: "global.creator",
        dv: "创建人",
      },
      value: data.publisher.account_name,
      render() {
        const { account_name, avatar } = data.publisher;
        return (
          <Space>
            <Avatar src={avatar}></Avatar>
            <span>{account_name}</span>
          </Space>
        );
      },
    },
    {
      label: {
        id: "global.createTime",
        dv: "创建时间",
      },
      valueType: "dateTime",
      value: data.created_time,
    },
    {
      label: {
        id: "global.updateTime",
        dv: "更新时间",
      },
      valueType: "dateTime",
      value: data.updated_time,
    },
  ];
  return <InfoForm items={items} formProps={{ layout: "vertical" }}></InfoForm>;
}
