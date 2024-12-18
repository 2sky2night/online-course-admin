import { FormattedMessage } from "@umijs/max";
import { Card, Flex, Space, Spin } from "antd";
import { useAntdToken } from "antd-style";
import { useEffect, useRef, useState } from "react";

import { monitorControllerGetSystemUsage as systemUsage } from "@/services/go_study_server/monitor";

import { NetworkChart, RingChart } from "./";
import { NetworkChatsInst } from "./network-chart";

type Response = API.ResponseDto & { data: API.SystemUsageDto };

/**
 * 五秒轮询
 */
const PollingTime = 5000;

/**
 * 系统监控可视化面盘
 */
export default function SystemPanel() {
  const { colorTextDescription, fontSizeSM } = useAntdToken(); // 引发性能的罪魁祸首
  const timer = useRef<number | null>(null);
  const controller = useRef(new window.AbortController());
  const networkRef = useRef<NetworkChatsInst | null>(null);
  const [usage, setUsage] = useState<API.SystemUsageDto>({
    cpu: {
      usage: 0,
      core_count: 0,
    },
    memory: {
      usage: 0,
      size: 0,
    },
    network: {
      upload: 0,
      download: 0,
    },
    disk: [],
  });
  const handleRequset = () => {
    async function request() {
      try {
        const r = (await systemUsage({
          signal: controller.current.signal,
        })) as Response;
        setUsage({ ...r.data });
        if (networkRef.current) {
          networkRef.current.setData((v) => {
            // 只要前十组数据 两条(上传和下载)数据为一组
            const { upload, download } = r.data.network;
            const time = Date.now();
            if (v.length >= 20) {
              v.pop();
              v.pop();
            }
            return [
              {
                time,
                value: upload,
                category: "upload",
              },
              {
                time,
                value: download,
                category: "download",
              },
              ...v,
            ] as any;
          });
        }
      } finally {
        timer.current = window.setTimeout(request, PollingTime);
      }
    }
    request();
  };

  const stopTimer = () => {
    // 取消请求
    controller.current.abort();
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
    }
  };

  useEffect(() => {
    handleRequset();
    return stopTimer;
  }, []);

  return (
    <Card
      title={<FormattedMessage id="page.home.usage" defaultMessage="系统监控" />}
      style={{ margin: "10px 0" }}
    >
      {usage.disk.length ? (
        <>
          <Space size="large">
            <RingChart percent={usage.cpu.usage}>
              <Flex
                vertical={true}
                align="center"
                style={{
                  color: colorTextDescription,
                  fontSize: `${fontSizeSM}px`,
                  marginTop: "5px",
                }}
              >
                <span>
                  {usage.cpu.core_count}
                  <FormattedMessage id="page.home.cpu.core" defaultMessage="核" />
                </span>
                <span>
                  <FormattedMessage id="page.home.cpu" defaultMessage="CPU 使用率" />
                </span>
              </Flex>
            </RingChart>
            <RingChart percent={usage.memory.usage}>
              <Flex
                vertical={true}
                align="center"
                style={{
                  color: colorTextDescription,
                  fontSize: `${fontSizeSM}px`,
                  marginTop: "5px",
                }}
              >
                <span>{Math.round(usage.memory.size / 1024 / 1024 / 1024)}G</span>
                <span>
                  <FormattedMessage id="page.home.memory" defaultMessage="内存 使用率" />
                </span>
              </Flex>
            </RingChart>
          </Space>
          <br></br>
          <Space size="large" style={{ marginTop: "10px" }}>
            {usage.disk.map((disk) => {
              return (
                <RingChart key={disk.mount} percent={disk.usage}>
                  <Flex
                    vertical={true}
                    align="center"
                    style={{
                      color: colorTextDescription,
                      fontSize: `${fontSizeSM}px`,
                      marginTop: "5px",
                    }}
                  >
                    <span>{Math.round(disk.size / 1024 / 1024 / 1024)}G</span>
                    <span>
                      {disk.fs || disk.mount}
                      <FormattedMessage id="page.home.disk" defaultMessage="磁盘 使用率" />
                    </span>
                  </Flex>
                </RingChart>
              );
            })}
          </Space>
          <NetworkChart ref={networkRef} />
        </>
      ) : (
        <Spin></Spin>
      )}
    </Card>
  );
}
