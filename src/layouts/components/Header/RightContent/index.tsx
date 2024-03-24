import { BulbOutlined } from "@ant-design/icons";
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
  return <BulbOutlined onClick={handleClick}></BulbOutlined>;
};
