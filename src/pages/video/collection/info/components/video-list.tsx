import { FormattedMessage, useModel } from "@umijs/max";
import { Button, message,Popconfirm } from "antd";
import { useRef } from "react";

import { Action, VideoPermission, VideoTable } from "@/components";
import type { VideoTableInst } from "@/components/table/video";
import {
  videoCollectionControllerRemoveVideos as removeVideos,
  videoCollectionControllerVideoList as videoList,
} from "@/services/go_study_server/videoCollection";
interface Props {
  collectionId: number;
  creatorId: number;
}

type Response = API.ResponseDto & {
  data: {
    list: API.RVideoListItemDto[];
    total: number;
    has_more: boolean;
  };
};

/**
 * 视频列表
 * // TODO 1.添加视频，弹出模态框，添加视频
 */
export default function VideoList({ collectionId, creatorId }: Props) {
  const state = useModel("@@initialState", (v) => v.initialState);
  const tableRef = useRef<VideoTableInst | null>(null);
  return (
    <VideoTable
      ref={tableRef}
      extraColumsList={
        state?.account?.account_id === creatorId
          ? [
              {
                dataIndex: "ascsac",
                title: <Action />,
                valueType: "option",
                render: (_, { video_id }) => {
                  return (
                    <Popconfirm
                      title={<FormattedMessage id="global.tips" defaultMessage="提示" />}
                      description={
                        <FormattedMessage
                          id="pages.video.collection.info.remove.tips"
                          defaultMessage="确认要从合集中移除该视频?"
                        />
                      }
                      onConfirm={async () => {
                        try {
                          await removeVideos(
                            {
                              cid: collectionId,
                            },
                            { video_id_list: [video_id] },
                          );
                          message.success(
                            <FormattedMessage
                              id="pages.video.collection.info.remove.ok"
                              defaultMessage="移除视频成功!"
                            />,
                          );
                          tableRef.current?.handleReload();
                          return Promise.resolve();
                        } catch (error) {
                          return Promise.resolve();
                        }
                      }}
                    >
                      <Button danger size="small" type="primary">
                        <FormattedMessage id="global.remove" defaultMessage="移除" />
                      </Button>
                    </Popconfirm>
                  );
                },
              },
            ]
          : []
      }
      tableProps={{
        toolBarRender: () => {
          return [
            <VideoPermission
              key="0"
              toAdmin={false}
              creatorId={creatorId}
              Component={() => {
                return (
                  <Button type="primary" onClick={() => message.info("填出模态框，添加视频")}>
                    <FormattedMessage
                      id="pages.video.collection.info.add.video"
                      defaultMessage="添加视频"
                    />
                  </Button>
                );
              }}
            />,
          ];
        },
      }}
      request={async (pageSize, page) => {
        try {
          const {
            data: { list, total },
          } = (await videoList({
            cid: collectionId,
            offset: (page - 1) * pageSize,
            limit: pageSize,
            desc: true,
          })) as Response;
          return {
            data: {
              list,
              total,
            },
          };
        } catch {
          return {
            data: {
              list: [],
              total: 0,
            },
          };
        }
      }}
    />
  );
}
