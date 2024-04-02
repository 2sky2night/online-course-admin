import type { ActionType } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useMemo, useRef, useState } from "react";

import { useI18n } from "@/hooks";
import { authAccountControllerGetApplyList as applyList } from "@/services/go_study_server/authAccount";
import type { ApplyAccount, PageParamsP } from "@/types";

import { colunmsRender } from "./config";
import { ApplyListResponse as ListResponse } from "./types";

export default function ApplyManagePage() {
  const { t } = useI18n();
  const actionRef = useRef<ActionType | null>(null);
  const [loading, setLoading] = useState(false);
  const refreshTable = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };
  const columns = useMemo(() => colunmsRender(setLoading, refreshTable), [actionRef.current]);

  return (
    <ProTable<ApplyAccount, PageParamsP>
      actionRef={actionRef}
      loading={loading}
      headerTitle={t("pages.account.apply.register.title", "审批注册申请")}
      rowKey="apply_id"
      columns={columns}
      request={async (params: { pageSize?: number; current?: number }) => {
        const { current = 1, pageSize = 20 } = params;
        const {
          data: { list, total },
        } = (await applyList({
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
