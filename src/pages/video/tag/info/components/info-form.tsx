import { Avatar, InfoForm } from "@/components";
import type { FormItem } from "@/components/form/info-form";
import type { VideoTagInfo } from "@/types";

interface Props {
  data: VideoTagInfo;
}

/**
 * 标签详情
 */
export default function TagInfoForm({ data }: Props) {
  const items: FormItem[] = [
    {
      label: {
        id: "id",
        dv: "id",
      },
      value: data.tag_id,
    },
    {
      label: {
        id: "global.tag.name",
        dv: "分区名",
      },
      value: data.tag_name,
    },
    {
      label: {
        id: "global.createTime",
        dv: "创建时间",
      },
      value: data.created_time,
    },
    {
      label: {
        id: "global.updateTime",
        dv: "更新时间",
      },
      value: data.updated_time,
    },
    {
      label: {
        id: "global.creator",
        dv: "创建人",
      },
      render: () => {
        return <Avatar src={data.account.avatar} username={data.account.account_name}></Avatar>;
      },
    },
  ];
  return <InfoForm items={items} />;
}
