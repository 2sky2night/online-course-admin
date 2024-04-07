import { ProTable } from "@ant-design/pro-components";
import { useMemo } from "react";

import { useI18n } from "@/hooks";
import { userControllerList as userList } from "@/services/go_study_server/user";

import { colunmsRender } from "./config";

type ListResponse = API.ResponseDto & {
  data: { list: API.UserInfoDto[]; total: number; has_more: boolean };
};

/**
 * 管理前台用户
 */
export default function ManageUserPage() {
  const { t } = useI18n();
  const columns = useMemo(() => colunmsRender(), []);
  return (
    <ProTable
      headerTitle={t("page.account.manage.toC.title", "前台用户管理")}
      rowKey="account_id"
      columns={columns}
      request={async ({ pageSize, current }: { pageSize?: number; current?: number }) => {
        const {
          data: { list, total },
        } = (await userList({
          offset: current ? (current - 1) * (pageSize || 20) : 0,
          limit: pageSize || 20,
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
