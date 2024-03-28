import { Form } from "antd";

import { useI18n } from "@/hooks";
import type { ApplyAccount } from "@/types";

interface Props {
  data: ApplyAccount;
}

//  "apply_id": 1,
//                     "account_name": "kk",
//                     "description": "米江斗手第果计加大合金而图年。万识际实只心反理少器习即示此历花。东空机他农过装受长可组车青专。今了队于于路出果速热下构没论术。争化场其里于为青火进精两知九华世济较。",
//                     "email": "3058150568@qq.com",
//                     "role_id": 2,
//                     "created_time": "2024-01-24T02:10:03.927Z",
//                     "updated_time": "2024-02-23T03:32:43.561Z",
//                     "deleted_time": null

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
    </>
  );
}
