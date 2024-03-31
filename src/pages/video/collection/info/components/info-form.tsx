import { useMemo } from "react";

import { Avatar, Image, InfoForm } from "@/components";
import type { FormItem } from "@/components/form/info-form";
import type { VideoCollectionInfo } from "@/types";
interface Props {
  data: VideoCollectionInfo;
}

/**
 * 合集信息
 */
export default function CollectionInfoForm({ data }: Props) {
  const items: FormItem[] = useMemo(
    () => [
      {
        label: {
          id: "global.collection.name",
          dv: "合集名",
        },
        value: data.collection_name,
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
        value: data.collection_cover,
        render(value: string) {
          return <Image src={value} />;
        },
      },
      {
        label: {
          id: "global.creator",
          dv: "创建人",
        },
        value: data.creator.account_name,
        render() {
          const { account_name, avatar } = data.creator;
          return <Avatar src={avatar} username={account_name}></Avatar>;
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
    ],
    [data],
  );
  return <InfoForm items={items} formProps={{ layout: "vertical" }}></InfoForm>;
}
