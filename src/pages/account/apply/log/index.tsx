import { ProTable } from "@ant-design/pro-components";
import { Modal } from "antd";
import { useMemo, useState } from "react";

import { useI18n } from "@/hooks";
import { authAccountControllerGetApprovalList as approvalList } from "@/services/go_study_server/authAccount";
import { ApplyAccount, Approval, PageParamsP } from "@/types";

import { ApplyForm } from "./components";
import { colunmsRender } from "./config";
import { ApprovalListResponse as ListResponse } from "./types";

export default function ApplyLogPage() {
  const { t } = useI18n();
  // 当前选择的申请记录
  const [apply, setApply] = useState<ApplyAccount | null>(null);
  // 是否显示模态框
  const isOpen = useMemo(() => {
    return !!apply;
  }, [apply]);
  // 在模态框中点击取消
  const handleCancel = () => {
    setApply(null);
  };
  // 打开模态框
  const handleOpenModal = (apply: ApplyAccount) => {
    setApply(apply);
  };
  // 表格列配置项(永久缓存)
  const colunms = useMemo(() => colunmsRender(handleOpenModal as any), []);
  return (
    <>
      <Modal
        title={t("pages.account.apply.log.modal.title", "申请注册")}
        open={isOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <ApplyForm data={apply as ApplyAccount} />
      </Modal>
      <ProTable<Approval, PageParamsP>
        headerTitle={t("pages.account.apply.log.title", "审批注册申请")}
        rowKey="trace_id"
        columns={colunms}
        request={async (params: { pageSize?: number; current?: number }) => {
          const { current = 1, pageSize = 20 } = params;
          const {
            data: { list, total },
          } = (await approvalList({
            offset: (current - 1) * pageSize,
            limit: pageSize,
            desc: false,
          })) as ListResponse;
          return {
            data: list,
            success: true,
            total,
          };
        }}
      />
    </>
  );
}
