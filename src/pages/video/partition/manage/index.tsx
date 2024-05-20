import { ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { useMemo } from "react";

import { Role } from "@/components";
import { Roles } from "@/enums";
import { useI18n } from "@/hooks";
import { videoPartitionControllerList as partitionList } from "@/services/go_study_server/videoPartition";

import { CreatePartitionModal } from "./components";
import { colunmsRender } from "./config";
import { PartitionListResponse as ListResponse } from "./types";
/**
 * 视频课程管理页
 */
export default function PartitionManagePage() {
  const { t } = useI18n();
  const initialState = useModel("@@initialState", (v) => v.initialState);
  const columns = useMemo(() => {
    const flag = initialState?.account?.role?.role_name === Roles.TEACHER;
    return colunmsRender(flag);
  }, []);
  return (
    <ProTable
      headerTitle={t("pages.video.parition.manage.title", "视频课程管理")}
      rowKey="partition_id"
      columns={columns}
      toolBarRender={(v) => {
        return [
          <Role
            key="0"
            roles={[Roles.ADMIN, Roles.SUPER_ADMIN, Roles.TEACHER]} // 暂时给老师放开
            Component={() => <CreatePartitionModal onSubmit={() => v?.reload()} />}
          />,
        ];
      }}
      request={async (params: { pageSize?: number; current?: number }) => {
        const { current = 1, pageSize = 20 } = params;
        const {
          data: { list, total },
        } = (await partitionList({
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
  );
}
