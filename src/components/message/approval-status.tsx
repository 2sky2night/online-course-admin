import { FormattedMessage } from "@umijs/max";
import { Tag } from "antd";

interface Props {
  /**
   * 审批是否通过
   */
  status: boolean;
}

/**
 * 渲染审批注册是否成功的文本
 */
export function ApprovallStatus({ status }: Props) {
  return (
    <Tag color={status ? "green" : "red"}>
      <FormattedMessage
        id={
          status ? "pages.account.apply.log.status.pass" : "pages.account.apply.log.status.noPass"
        }
        defaultMessage={status ? "通过" : "未通过"}
      ></FormattedMessage>
    </Tag>
  );
}
