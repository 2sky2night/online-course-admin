import { Avatar, InfoForm } from "@/components";
import type { FormItem } from "@/components/form/info-form";
import type { VideoPartitionInfo } from "@/types";

interface Props {
  data: VideoPartitionInfo;
}

/**
 * 课程详情信息
 * @returns
 */
export default function PartitionInfoForm({ data }: Props) {
  const items: FormItem[] = [
    {
      label: {
        id: "id",
        dv: "id",
      },
      value: data.partition_id,
    },
    {
      label: {
        id: "global.partition.name",
        dv: "课程名",
      },
      value: data.partition_name,
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
  return <InfoForm items={items}></InfoForm>;
}
