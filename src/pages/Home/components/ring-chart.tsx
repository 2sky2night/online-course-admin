import { Tiny } from "@ant-design/charts";
import { Flex } from "antd";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  /**
   * 百分比
   */
  percent: number;
}

export default function RingChart({ percent, children }: Props) {
  const config = {
    percent: percent / 100,
    width: 120,
    height: 120,
    color: ["#E8EFF5", "#66AFF4"],
    annotations: [
      {
        type: "text",
        style: {
          text: `${Math.round(percent)}%`,
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 16,
          fontStyle: "bold",
        },
      },
    ],
  };
  return (
    <Flex vertical={true} align="center">
      <Tiny.Ring {...config} />
      {children}
    </Flex>
  );
}
