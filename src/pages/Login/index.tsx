import { LoginForm } from "@ant-design/pro-components";
import { SelectLang, useModel } from "@umijs/max";
import { history } from "@umijs/max";
import { Button, Flex } from "antd";
import { createStyles } from "antd-style";
import { useCallback, useRef } from "react";

import { Tabs } from "@/components";
import type { TabsProps } from "@/components/tabs";
import { AppLogoURL, AppName, LoginBackgourndImg } from "@/constants";
import { useI18n } from "@/hooks";
import { accountControllerGetInfoByToken as getAccountInfo } from "@/services/go_study_server/account";
import {
  authAccountControllerEmailLogin as loginByEmail,
  authAccountControllerLogin as loginByPassword,
} from "@/services/go_study_server/authAccount";
import { InitialState } from "@/types";
import { globalErrorMsg,Token } from "@/utils";

import Email from "./components/email";
import Password from "./components/password";

enum TabKeys {
  email = "email",
  password = "password",
}

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
    container: {},
    title: {
      color: token.colorPrimary,
    },
    endBox: {
      marginTop: "-10px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "end",
    },
  };
});

export default function LoginPage() {
  const setInitialState = useModel("@@initialState", (v) => v.setInitialState);
  const { t } = useI18n();
  const { styles } = useStyles();
  const formRef = useRef(null);
  // 保存tab栏的key
  const tabs = useRef<TabKeys | null>(null);
  const items: TabsProps<TabKeys>["items"] = [
    {
      key: TabKeys.password,
      label: t("pages.login.accountLogin.tab", "密码登录"),
      children: <Password />,
    },
    {
      key: TabKeys.email,
      label: t("pages.login.emailLogin.tab", "验证码登录"),
      children: <Email />,
    },
  ];

  // tab栏更新的回调
  const handleChange = (key: TabKeys) => {
    tabs.current = key;
  };
  // 登录成功的回调
  const handleLogin = (token: string) => {
    Token.setToken(token);
    getAccountInfo().then(({ data }) => {
      // 在全局中保存用户信息
      setInitialState((v) => {
        return {
          ...v,
          account: data,
        } as InitialState;
      }).then(() => {
        setTimeout(() => {
          history.replace("/"); // 更新成功后，进入系统页
        });
      });
    });
  };
  // 提交的回调
  const handleSubmit = useCallback((data: API.LoginAccountDto | API.EmailLoginDto) => {
    if (tabs.current === TabKeys.email) {
      // 邮箱登录
      const { email, code } = data as API.EmailLoginDto;
      loginByEmail({ email, code }).then(({ data }) => {
        handleLogin(data!.access_token);
      });
    } else if (tabs.current === TabKeys.password) {
      // 密码登录
      const { password, username } = data as API.LoginAccountDto;
      loginByPassword({ password, username }).then(({ data }) => {
        handleLogin(data!.access_token);
      });
    } else {
      globalErrorMsg(t);
    }
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Flex justify="end">
          <SelectLang />
        </Flex>
        <LoginForm
          formRef={formRef}
          contentStyle={{
            minWidth: 280,
            maxWidth: "75vw",
          }}
          logo={<img alt="logo" src={AppLogoURL} />}
          title={t("appName", AppName)}
          subTitle={t("pages.login.title", "一站式管理系统应用的服务平台")}
          onFinish={handleSubmit as any}
        >
          <Tabs<TabKeys>
            items={items}
            keys={[TabKeys.email, TabKeys.password]}
            defaultKeys={TabKeys.password}
            queryParam="tab"
            tabsProps={{ centered: true, destroyInactiveTabPane: true }}
            onChange={handleChange}
          />
          <div className={styles.endBox}>
            <Button type="link" onClick={() => history.push("/apply-register")}>
              {t("pages.login.toApplyAccount.tips", "没有账号? 申请注册!")}
            </Button>
          </div>
        </LoginForm>
      </div>
    </div>
  );
}
