import { FormattedMessage } from "@umijs/max";
import { Button, message,Popconfirm } from "antd";

import { useI18n } from "@/hooks";
import { authAccountControllerApproval as approval } from "@/services/go_study_server/authAccount";

interface Props {
  apply_id: number;
  setLoading: (value: boolean) => void;
  refreshTable: () => void;
}

/**
 * 审批驳回按钮
 * @returns
 */
export function NoPassBtn({ apply_id, setLoading, refreshTable }: Props) {
  const { t } = useI18n();
  const handleConfirm = () => {
    setLoading(true);
    approval({
      apply_id,
      status: false,
    })
      .then(() => {
        setLoading(false);
        message.success(t("pages.account.apply.register.option.noPass.ok", "申请驳回成功!"));
        refreshTable();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <Popconfirm
      title={t("global.tips", "提示")}
      description={t("pages.account.apply.register.option.noPass.tips", "确认驳回申请?")}
      onConfirm={handleConfirm}
    >
      <Button type="primary" danger size="small">
        <FormattedMessage id="pages.account.apply.register.option.noPass" defaultMessage="驳回" />
      </Button>
    </Popconfirm>
  );
}
