import { ProTable } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { useMemo } from "react";

import { Role } from "@/components";
import { Roles } from "@/enums";
import { useI18n } from "@/hooks";
import { videoTagControllerList as tagList } from "@/services/go_study_server/videoTag";

import { CreateTagModal } from "./components";
import { colunmsRender } from "./config";
import { TagListResponse as ListResponse } from "./types";

/**
 * 标签管理页
 */
export default function TagManagePage() {
  const { t } = useI18n();
  const initialState = useModel("@@initialState", (v) => v.initialState);
  const columns = useMemo(() => {
    const flag = initialState?.account?.role?.role_name === Roles.TEACHER;
    return colunmsRender(flag);
  }, []);
  return (
    <ProTable
      headerTitle={t("pages.video.tag.manage.title", "视频标签管理")}
      rowKey="tag_id"
      columns={columns}
      toolBarRender={(v) => {
        return [
          <Role
            key="0"
            roles={[Roles.ADMIN, Roles.SUPER_ADMIN]}
            Component={() => <CreateTagModal onSubmit={() => v?.reload()} />}
          />,
        ];
      }}
      request={async (params: { pageSize?: number; current?: number }) => {
        const { current = 1, pageSize = 20 } = params;
        const {
          data: { list, total },
        } = (await tagList({
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
