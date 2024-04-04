import {
  WeatherMoon16Regular as DarkIcon,
  WeatherSunny16Regular as LightIcon,
} from "@ricons/fluent";
import { Icon } from "@ricons/utils";
import { SelectLang as UmiSelectLang, useModel } from "@umijs/max";
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
  const init = useModel("@@initialState", (v) => v.initialState);
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
  return (
    <div
      onClick={handleClick}
      style={{
        height: "42px",
        width: "42px",
      }}
    >
      <Icon>
        {init.config.isDark ? (
          <LightIcon style={{ position: "relative", top: "-12px", left: "7px" }} />
        ) : (
          <DarkIcon style={{ position: "relative", top: "-12px", left: "7px" }} />
        )}
      </Icon>
    </div>
  );
};
