import { FormattedMessage } from "@umijs/max";
import { Button, message,Popconfirm } from "antd";
import { useTheme } from "antd-style";

import { useI18n } from "@/hooks";
import { authAccountControllerApproval as approval } from "@/services/go_study_server/authAccount";

interface Props {
  apply_id: number;
  setLoading: (value: boolean) => void;
  refreshTable: () => void;
}

/**
 * 审批通过按钮
 * @returns
 */
export function PassBtn({ apply_id, setLoading, refreshTable }: Props) {
  const { t } = useI18n();
  const { colorSuccess } = useTheme();
  const handleConfirm = () => {
    setLoading(true);
    approval({
      apply_id,
      status: true,
    })
      .then(() => {
        setLoading(false);
        message.success(t("pages.account.apply.register.option.pass.ok", "申请通过成功!"));
        refreshTable();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  return (
    <Popconfirm
      title={t("global.tips", "提示")}
      description={t("pages.account.apply.register.option.pass.tips", "确认通过申请?")}
      onConfirm={handleConfirm}
    >
      <Button type="primary" style={{ background: colorSuccess }} size="small">
        <FormattedMessage id="pages.account.apply.register.option.pass" defaultMessage="通过" />
      </Button>
    </Popconfirm>
  );
}
