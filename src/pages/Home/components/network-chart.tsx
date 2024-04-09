import type { LineConfig } from "@ant-design/charts";
import { Line } from "@ant-design/charts";
import { useModel } from "@umijs/max";
import { forwardRef, useImperativeHandle,useState } from "react";

interface NetworkItem {
  time: number;
  value: 0;
  category: "upload" | "download";
}

export interface NetworkChatsInst {
  setData: React.Dispatch<React.SetStateAction<NetworkItem[]>>;
}

const NetworkChart = forwardRef<NetworkChatsInst>((_, ref) => {
  const state = useModel("@@initialState", (v) => v.initialState);
  const [data, setData] = useState<NetworkItem[]>([]);
  const config: LineConfig = {
    theme: {
      type: state?.config.isDark ? "dark" : "light",
    },
    title: "网络 使用率",
    data,
    yField: (d: { value: number }) => Number((d.value * 1024).toFixed(2)),
    xField: (d: { time: number }) => new Date(d.time),
    sizeField: "value",
    shapeField: "trail",
    legend: { size: false },
    colorField: "category",
    label: {
      formatter(text: string) {
        return text + " KB";
      },
    },
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        setData,
      };
    },
    [],
  );
  return (
    <div>
      <Line {...config} />
    </div>
  );
});

export default NetworkChart;
