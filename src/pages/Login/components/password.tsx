import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ProFormText } from "@ant-design/pro-components";
import { FormattedMessage } from "@umijs/max";

import { useI18n } from "@/hooks";

export default function Password() {
  const { t } = useI18n();
  return (
    <>
      <ProFormText
        name="username"
        fieldProps={{
          size: "large",
          prefix: <UserOutlined />,
        }}
        placeholder={t("pages.login.username.placeholder")}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage id="pages.login.username.required" defaultMessage="请输入用户名!" />
            ),
          },
          {
            message: (
              <FormattedMessage
                id="pages.login.username.invalid"
                defaultMessage="用户名长度为1-15位！"
              />
            ),
            validator(_, value) {
              if (value.length >= 1 && value.length <= 15) {
                return Promise.resolve();
              } else {
                return Promise.reject();
              }
            },
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: "large",
          prefix: <LockOutlined />,
        }}
        placeholder={t("pages.login.password.placeholder")}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage id="pages.login.password.required" defaultMessage="请输入密码！" />
            ),
          },
          {
            message: (
              <FormattedMessage
                id="pages.login.password.invalid"
                defaultMessage="密码长度为6-14位!"
              />
            ),
            validator(_, value: string) {
              if (value.length >= 6 && value.length <= 14) {
                return Promise.resolve();
              } else {
                return Promise.reject();
              }
            },
          },
        ]}
      />
    </>
  );
}
