import { ActionType, ProTable } from "@ant-design/pro-components";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

import { colunmsRender } from "./config";
import { Props } from "./types";

export interface VideoTableInst {
  /**
   * 刷新表格
   */
  handleReload: () => void;
}

/**
 * 渲染视频表格
 */
const VideoTable = forwardRef<VideoTableInst, Props>(
  ({ request, tableProps, extraColumsList }, ref) => {
    const columns = useMemo(() => colunmsRender(extraColumsList), []);
    const actionRef = useRef<ActionType | null>(null);
    const handleReload = () => {
      actionRef.current?.reload();
    };
    useImperativeHandle(
      ref,
      () => {
        return {
          handleReload,
        };
      },
      [],
    );
    return (
      <ProTable
        rowKey="video_id"
        columns={columns}
        actionRef={actionRef}
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
  },
);

export default VideoTable;
