import { LockOutlined, MediumOutlined } from "@ant-design/icons";
import { ProFormCaptcha, ProFormText } from "@ant-design/pro-components";
import { FormattedMessage } from "@umijs/max";

import { EmailRegex } from "@/constants";
import { useI18n } from "@/hooks";
import { authAccountControllerGetLoginCode as getLoginCode } from "@/services/go_study_server/authAccount";

export default function Email() {
  const { t } = useI18n();
  return (
    <>
      <ProFormText
        fieldProps={{
          size: "large",
          prefix: <MediumOutlined />,
        }}
        name="email"
        placeholder={t("pages.login.email.placeholder", "请输入邮箱")}
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage id="pages.login.email.required" defaultMessage="邮箱是必填项!" />
            ),
          },
          {
            pattern: EmailRegex,
            message: (
              <FormattedMessage id="pages.login.email.invalid" defaultMessage="不合法的邮箱!" />
            ),
          },
        ]}
      />
      <ProFormCaptcha
        fieldProps={{
          size: "large",
          prefix: <LockOutlined />,
        }}
        captchaProps={{
          size: "large",
          nonce: "",
        }}
        placeholder={t("pages.login.captcha.placeholder")}
        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${count} ${t("pages.login.getCaptchaSecondText")}`;
          }
          return t("pages.login.phoneLogin.getVerificationCode");
        }}
        phoneName="email" // 在点击获取验证码前会去校验表单中的某个字段
        name="code"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage id="pages.login.captcha.required" defaultMessage="请输入验证码!" />
            ),
          },
        ]}
        onGetCaptcha={async (email) => {
          // 组件库在点击按钮之时会先校验邮箱字段，才会走这个回调
          return getLoginCode({ email })
            .then(() => {
              return Promise.resolve();
            })
            .catch(() => {
              // 获取邮箱验证码失败
              return Promise.reject();
            });
        }}
      />
    </>
  );
}
