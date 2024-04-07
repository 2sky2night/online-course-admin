import { ProForm, ProFormText } from "@ant-design/pro-components";
import type { FormRule } from "antd";
import { Card, message } from "antd";

import { useI18n } from "@/hooks";
import { accountControllerUpdatePassword as editPassword } from "@/services/go_study_server/account";
import { Token } from "@/utils";

/**
 * 编辑用户密码
 */
export default function EditPassword() {
  const { t } = useI18n();
  const commentRule: FormRule[] = [
    {
      required: true,
      message: t("pages.login.password.required", "请输入密码！"),
    },
    {
      message: t("pages.login.password.invalid", "密码长度为6-14位!"),
      validator(_, value: string) {
        if (value.length >= 6 && value.length <= 14) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
    },
  ];
  const handleSubmit = async (v: API.UpdateAccountPasswordDto) => {
    try {
      await editPassword(v);
      message.success(t("page.account.edit.info.password", "更新账户密码成功!"));
      setTimeout(() => {
        window.location.assign("/login"); // 返回登录页
      }, 300);
      Token.removeToken();
    } catch (error) {
      return Promise.reject();
    }
  };
  return (
    <Card type="inner" title={t("page.account.edit.password", "密码")}>
      <ProForm<API.UpdateAccountPasswordDto> onFinish={handleSubmit}>
        <ProFormText.Password
          name="old_password"
          rules={commentRule}
          label={t("page.account.edit.nowPassword", "当前密码")}
          placeholder={t("pages.login.password.placeholder")}
        />
        <ProFormText.Password
          name="password"
          rules={commentRule}
          label={t("page.account.edit.newPassword", "新密码")}
          placeholder={t("pages.login.password.placeholder")}
        />
      </ProForm>
    </Card>
  );
}
