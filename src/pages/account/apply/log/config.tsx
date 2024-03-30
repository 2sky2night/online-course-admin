import type { ProColumns } from "@ant-design/pro-components";
import { FormattedMessage } from "@umijs/max";
import { Button } from "antd";

import { ApprovallStatus } from "@/components";
import { Action, CreateTime, UpdateTime } from "@/components";
import type { ApplyAccount, Approval } from "@/types";

type Render = (
  onClickInfo: (apply: Omit<ApplyAccount, "approval">) => void,
) => ProColumns<Approval>[];

/**
 * 表单的配置项
 */
export const colunmsRender: Render = (onClickInfo) => [
  {
    dataIndex: "trace_id",
    title: "id",
    search: false,
  },
  {
    dataIndex: "approval_account.account_name",
    valueType: "text",
    title: <FormattedMessage id="pages.account.apply.log.owner.title" defaultMessage="操作人" />,
    render(_, entity) {
      return <span>{entity.approval_account.account_name}</span>;
    },
  },
  {
    dataIndex: "status",
    valueType: "text",
    title: <FormattedMessage id="pages.account.apply.log.status.title" defaultMessage="审批状态" />,
    render(_, { status }) {
      return <ApprovallStatus status={status} />;
    },
  },
  {
    dataIndex: "created_time",
    valueType: "dateTime",
    title: <CreateTime />,
  },
  {
    dataIndex: "updated_time",
    valueType: "dateTime",
    title: <UpdateTime />,
  },
  {
    valueType: "option",
    title: <Action />,
    render(_, { apply }) {
      return [
        <Button key="1" type="link" onClick={() => onClickInfo(apply)}>
          <FormattedMessage id="global.info" defaultMessage="查看" />
        </Button>,
      ];
    },
  },
];
