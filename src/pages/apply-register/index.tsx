import { ProForm, ProFormSelect,ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { FormattedMessage, history,SelectLang } from "@umijs/max";
import { Flex, message,Space } from "antd";
import { createStyles } from "antd-style";

import { AppLogoURL, EmailRegex, LoginBackgourndImg } from "@/constants";
import { Roles } from "@/enums";
import { useI18n } from "@/hooks";
import { authAccountControllerApply as apply } from "@/services/go_study_server/authAccount";

const useStyles = createStyles(({ token }) => {
  return {
    page: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "auto",
      backgroundImage: `url(${LoginBackgourndImg})`,
      backgroundSize: "100% 100%",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    logo: {
      width: "44px",
      height: "44px",
      marginInlineEnd: "16px",
      verticalAlign: "top",
    },
    logoHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "44px",
      lineHeight: "44px",
    },
    title: {
      fontSize: `33px`,
      fontWeight: token.fontWeightStrong,
      color: token.colorText,
    },
    subTitle: {
      margin: "20px 0",
      color: token.colorTextDescription,
    },
  };
});

export default function ApplyRegisterPage() {
  const { t } = useI18n();
  const { styles } = useStyles();
  const handleSubmit = async (formData: API.ApplyAccountDto) => {
    apply({ ...formData }).then(() => {
      message.success(t("pages.applyRegister.formOk", "申请注册成功"));
      history.push("/login");
    });
  };
  return (
    <div className={styles.page}>
      <Flex justify="end">
        <SelectLang />
      </Flex>
      <div className={styles.container}>
        <div className={styles.logoHeader}>
          <img className={styles.logo} alt="logo" src={AppLogoURL} />
          <span className={styles.title}>
            <FormattedMessage id="appName" />
          </span>
        </div>
        <div className={styles.subTitle}>{t("menu.apply-register", "申请账号注册")}</div>
        <ProForm<API.ApplyAccountDto>
          submitter={{
            render(_, dom) {
              return (
                <Flex justify="flex-end">
                  <Space>{dom}</Space>
                </Flex>
              );
            },
          }}
          style={{
            width: "75vw",
          }}
          onFinish={handleSubmit}
        >
          <ProFormText
            name="username"
            label={t("pages.applyRegister.username.label", "用户名")}
            placeholder={t("pages.login.username.placeholder")}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.username.required"
                    defaultMessage="请输入用户名!"
                  />
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
            label={t("pages.applyRegister.password.label", "密码")}
            placeholder={t("pages.login.password.placeholder")}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.password.required"
                    defaultMessage="请输入密码！"
                  />
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
          <ProFormText
            label={t("pages.applyRegister.email.label", "邮箱")}
            name="email"
            placeholder={t("pages.login.email.placeholder", "请输入邮箱")}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.email.required"
                    defaultMessage="邮箱是必填项!"
                  />
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
          <ProFormTextArea
            fieldProps={{
              maxLength: 255,
              minLength: 20,
            }}
            label={t("pages.applyRegister.description.label", "申请注册原因")}
            name="description"
            placeholder={t("pages.applyRegister.description.placeholder", "请输入申请注册原因")}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.email.required"
                    defaultMessage="申请注册原因是必填项!"
                  />
                ),
              },
              {
                message: (
                  <FormattedMessage
                    id="pages.applyRegister.description.invalid"
                    defaultMessage="申请注册原因为20-255位!"
                  />
                ),
                validator(_, value: string) {
                  if (value.length >= 20 && value.length <= 255) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject();
                  }
                },
              },
            ]}
          />
          <ProFormSelect
            name="role_name"
            label={t("pages.applyRegister.role.label", "角色")}
            valueEnum={{
              [Roles.ADMIN]: t("global.role.admin", "管理员"),
              [Roles.TEACHER]: t("global.role.teacher", "老师"),
            }}
            placeholder={t("pages.applyRegister.role.placeholder", "请选择注册的角色")}
            rules={[
              {
                required: true,
                message: t("pages.applyRegister.role.required", "请选择注册的角色!"),
              },
            ]}
          />
        </ProForm>
      </div>
    </div>
  );
}
