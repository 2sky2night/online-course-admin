import { ProTable } from "@ant-design/pro-components";
import { useMemo } from "react";

import { Role } from "@/components";
import { Roles } from "@/enums";
import { useI18n } from "@/hooks";
import { videoCollectionControllerList as collectionList } from "@/services/go_study_server/videoCollection";
import type { PageParamsP, VideoCollection } from "@/types";

import { CreateCollectionModal } from "./components";
import { colunmsRender } from "./config";
import { VideoCollectionListResponse as ListResponse } from "./types";

export default function VideoCollectionManagePage() {
  const { t } = useI18n();
  const columns = useMemo(() => colunmsRender(), []);

  return (
    <>
      <ProTable<VideoCollection, PageParamsP>
        headerTitle={t("pages.video.collection.title", "视频合集管理")}
        rowKey="collection_id"
        toolBarRender={(d) => {
          const refresh = () => {
            d?.reload();
          };
          return [
            <Role
              key="0"
              roles={[Roles.TEACHER]}
              Component={() => {
                return <CreateCollectionModal onSubmit={refresh} />;
              }}
            />,
          ];
        }}
        columns={columns}
        request={async (params: { pageSize?: number; current?: number }) => {
          const { current = 1, pageSize = 20 } = params;
          const {
            data: { list, total },
          } = (await collectionList({
            offset: (current - 1) * pageSize,
            limit: pageSize,
            desc: true,
          })) as ListResponse;
          return {
            data: list,
            success: true,
            total,
          };
        }}
      />
    </>
  );
}
