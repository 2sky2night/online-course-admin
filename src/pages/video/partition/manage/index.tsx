import type { ActionType } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useMemo, useRef, useState } from "react";

import { Role } from "@/components";
import { Roles } from "@/enums";
import { useI18n } from "@/hooks";
import { videoPartitionControllerList as partitionList } from "@/services/go_study_server/videoPartition";
import type { VideoPartitionItem } from "@/types";

import { CreatePartitionModal, EditPartitionModal } from "./components";
import { colunmsRender } from "./config";
import { PartitionListResponse as ListResponse } from "./types";

/**
 * 视频课程管理页
 */
export default function PartitionManagePage() {
  const { t } = useI18n();
  const actionRef = useRef<ActionType | null>(null);
  // 是否显示编辑弹窗
  const [showEdit, setShowEdit] = useState(false);
  // 编辑的分区信息
  const [editData, setEditData] = useState<{ id: null | number; name: string }>({
    id: null,
    name: "",
  });
  // 点击编辑的回调
  const handleEdit = (entity: VideoPartitionItem) => {
    setEditData({ name: entity.partition_name, id: entity.partition_id });
    setShowEdit(true);
  };
  const columns = useMemo(() => {
    return colunmsRender(handleEdit);
  }, []);

  return (
    <>
      <ProTable
        actionRef={actionRef}
        headerTitle={t("pages.video.parition.manage.title", "课程管理")}
        rowKey="partition_id"
        columns={columns}
        toolBarRender={(v) => {
          return [
            <Role
              key="0"
              roles={[Roles.TEACHER]}
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
      <EditPartitionModal
        editData={editData}
        show={showEdit}
        onOpenChange={setShowEdit}
        onSubmit={() => {
          actionRef.current?.reload();
          setEditData({ id: null, name: "" });
        }}
      />
    </>
  );
}
