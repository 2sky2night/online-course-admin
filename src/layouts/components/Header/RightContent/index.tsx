import { QuestionCircleOutlined } from "@ant-design/icons";
import { SelectLang as UmiSelectLang } from "@umijs/max";
import React from "react";

import { InitialState } from "@/types";

export type SiderTheme = "light" | "dark";

export const SelectLang = () => {
  return (
    <UmiSelectLang
      style={{
        padding: 4,
      }}
    />
  );
};

export const Question = () => {
  return (
    <div
      style={{
        display: "flex",
        height: 26,
      }}
      onClick={() => {
        window.open("https://pro.ant.design/docs/getting-started");
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};

export const Theme = (props: {
  changeState: (exec: (oldData: InitialState) => InitialState) => void;
}) => {
  const handleClick = () => {
    props.changeState((old) => {
      return {
        ...old,
        config: {
          ...old.config,
          isDark: !old.config.isDark,
        },
      };
    });
  };
  return <div onClick={handleClick}>主题</div>;
};
