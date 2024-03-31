import { FormattedMessage, useModel } from "@umijs/max";
import { Button, message } from "antd";

import { Action,VideoPermission, VideoTable } from "@/components";
import { videoCollectionControllerVideoList as videoList } from "@/services/go_study_server/videoCollection";

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
 * // TODO 2.移除视频
 */
export default function VideoList({ collectionId, creatorId }: Props) {
  const state = useModel("@@initialState", (v) => v.initialState);
  return (
    <VideoTable
      extraColumsList={
        state?.account?.account_id === creatorId
          ? [
              {
                dataIndex: "ascsac",
                title: <Action />,
                valueType: "option",
                render: () => {
                  return (
                    <Button
                      danger
                      size="small"
                      type="primary"
                      onClick={() => message.info("二次确认")}
                    >
                      <FormattedMessage id="global.remove" defaultMessage="移除" />
                    </Button>
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
