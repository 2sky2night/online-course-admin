import { Space, Tag } from "antd";

import { InfoForm } from "@/components";
import { FormItem } from "@/components/form/info-form";
import { VideoInfo } from "@/types";

interface Props {
  data: VideoInfo;
}

/**
 * 视频的动态数据表单
 */
export default function VideoDataForm({ data }: Props) {
  const items: FormItem[] = [
    {
      label: {
        id: "global.count.like",
        dv: "点赞数量",
      },
      value: data.count.likes,
    },
    {
      label: {
        id: "global.count.star",
        dv: "收藏数量",
      },
      value: data.count.stars,
    },
    {
      label: {
        id: "global.count.view",
        dv: "观看数量",
      },
      value: data.count.views,
    },
    {
      label: {
        id: "global.partition",
        dv: "分区",
      },
      value: data.partition.partition_name,
    },
    {
      label: {
        id: "global.tag",
        dv: "标签",
      },
      render() {
        return (
          <Space>
            {data.tags.map((tag) => (
              <Tag key={tag.tag_id}>{tag.tag_name}</Tag>
            ))}
          </Space>
        );
      },
    },
  ];
  return <InfoForm items={items} formProps={{ layout: "vertical" }} />;
}
