import { ProTable } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button } from "antd";
import { useMemo } from "react";

import { Role } from "@/components";
import { Roles } from "@/enums";
import { useI18n } from "@/hooks";
import { videoControllerList as videList } from "@/services/go_study_server/video";

import { colunmsRender } from "./config";
import { VideoListResponse } from "./types";

/**
 * 管理视频页
 */
export default function VideoPage() {
  const { t } = useI18n();
  const columns = useMemo(() => colunmsRender(), []);
  return (
    <ProTable
      headerTitle={t("pages.video.base.manage.title", "视频管理")}
      rowKey="video_id"
      columns={columns}
      toolBarRender={() => {
        return [
          <Role
            key="0"
            roles={[Roles.TEACHER]}
            Component={() => (
              <Button type="primary" onClick={() => history.push("/video/base/create")}>
                {t("pages.video.base.manage.create", "创建视频")}
              </Button>
            )}
          />,
        ];
      }}
      request={async (params: { pageSize?: number; current?: number }) => {
        const { current = 1, pageSize = 20 } = params;
        const {
          data: { list, total },
        } = (await videList({
          offset: (current - 1) * pageSize,
          limit: pageSize,
          desc: false,
        })) as VideoListResponse;
        return {
          data: list,
          success: true,
          total,
        };
      }}
    />
  );
}
