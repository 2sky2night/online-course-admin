import { ProTable } from "@ant-design/pro-components";
import { useMemo } from "react";

import { colunmsRender } from "./config";
import { Props } from "./types";

/**
 * 渲染视频表格
 */
export default function VideoTable<T>({ request }: Props<T>) {
  const columns = useMemo(() => colunmsRender(), []);
  return (
    <ProTable
      rowKey="video_id"
      columns={columns}
      request={async (params: { pageSize?: number; current?: number }) => {
        const { current = 1, pageSize = 20 } = params;
        const {
          data: { list, total },
        } = (await request(pageSize, current)) as any;
        return {
          data: list,
          success: true,
          total,
        };
      }}
    />
  );
}
