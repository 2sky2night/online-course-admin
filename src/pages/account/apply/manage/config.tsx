import type { ProColumns } from "@ant-design/pro-components";
import { FormattedMessage } from "@umijs/max";
import { Space } from "antd";

import { Action, ApprovallStatus, CreateTime, RoleMessage as Role } from "@/components";
import { Roles } from "@/enums";
import type { ApplyAccount } from "@/types";

import { NoPassBtn, PassBtn } from "./components";

type Render = (
  setLoading: (value: boolean) => void,
  refreshTable: () => void,
) => ProColumns<ApplyAccount>[];

/**
 * 表单的配置项
 */
export const colunmsRender: Render = (setLoading, refreshTable) => [
  {
    dataIndex: "apply_id",
    title: "id",
    valueType: "index",
    search: false,
  },
  {
    dataIndex: "account_name",
    valueType: "text",
    title: <FormattedMessage id="pages.account.apply.log.register.name" defaultMessage="账户名" />,
  },
  {
    dataIndex: "email",
    valueType: "text",
    title: <FormattedMessage id="pages.account.apply.log.register.email" defaultMessage="邮箱" />,
  },
  {
    dataIndex: "description",
    valueType: "text",
    ellipsis: true,
    width: "150px",
    title: (
      <FormattedMessage
        id="pages.account.apply.log.register.description"
        defaultMessage="申请原因"
      />
    ),
  },
  {
    dataIndex: "role_name",
    valueType: "text",
    title: <FormattedMessage id="global.role" defaultMessage="角色" />,
    render(_, { role: { role_name } }) {
      return <Role value={role_name as Roles} />;
    },
  },
  {
    dataIndex: "created_time",
    valueType: "dateTime",
    title: <CreateTime />,
  },
  {
    valueType: "option",
    title: <Action />,
    render(_, { apply_id, approval }) {
      if (approval) {
        // 审批了
        return <ApprovallStatus status={approval.status} />;
      } else {
        // 未审批
        return (
          <Space>
            <PassBtn apply_id={apply_id} refreshTable={refreshTable} setLoading={setLoading} />
            <NoPassBtn apply_id={apply_id} refreshTable={refreshTable} setLoading={setLoading} />
          </Space>
        );
      }
    },
  },
];
