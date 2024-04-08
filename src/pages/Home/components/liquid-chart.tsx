import type { LiquidConfig } from "@ant-design/charts";
import { Liquid } from "@ant-design/charts";
import { Flex } from "antd";
import type { PropsWithChildren } from "react";
interface Props extends PropsWithChildren {
  /**
   * 百分比
   */
  percent: number;
}

export default function LiquidChart({ percent, children }: Props) {
  const config: LiquidConfig = {
    percent: Math.round(percent / 100),
    style: {
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    },
  };
  return (
    <Flex vertical={true}>
      <Liquid {...config} />
      {children}
    </Flex>
  );
}
