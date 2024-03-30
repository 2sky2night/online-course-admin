import { Form } from "antd";

import { RoleMessage as Role } from "@/components";
import { Roles } from "@/enums";
import { useI18n } from "@/hooks";
import type { ApplyAccount } from "@/types";

interface Props {
  data: ApplyAccount;
}

/**
 * 申请记录表单
 */
export default function ApplyForm({ data }: Props) {
  const { t } = useI18n();
  return (
    <>
      <Form.Item label="id">{data.apply_id}</Form.Item>
      <Form.Item label={t("pages.account.apply.log.modal.name", "账户名")}>
        {data.account_name}
      </Form.Item>
      <Form.Item label={t("pages.account.apply.log.modal.desciption", "申请描述")}>
        {data.description}
      </Form.Item>
      <Form.Item label={t("pages.account.apply.log.modal.email", "邮箱")}>{data.email}</Form.Item>
      <Form.Item label={t("global.role", "角色")}>
        <Role value={data.role.role_name as Roles}></Role>
      </Form.Item>
    </>
  );
}
