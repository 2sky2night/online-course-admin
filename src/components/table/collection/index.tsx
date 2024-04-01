import { ProTable } from "@ant-design/pro-components";
import { useMemo } from "react";

import { colunmsRender } from "./config";
import { Props } from "./types";

/**
 * 渲染视频合集的表格
 */
export default function VideoCollectionTable<T>({
  request,
  tableProps,
  extraColumsList,
}: Props<T>) {
  const columns = useMemo(() => colunmsRender(extraColumsList), []);
  return (
    <ProTable
      rowKey="collection_id"
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
      {...(tableProps as any)}
    />
  );
}