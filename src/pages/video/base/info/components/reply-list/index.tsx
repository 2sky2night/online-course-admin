import { FormattedMessage } from "@umijs/max";
import { Button, message } from "antd";

import { Action, VideoReplyTable as Table } from "@/components";
import { videoReplyControllerReplyListInVideo as replyList } from "@/services/go_study_server/videoReply";
import type { VideoReplyListResponse as ListResponse } from "@/types";

interface Props {
  vid: number;
}

/**
 * 某个视频下的回复列表
 */
export default function VideoReplyTable({ vid }: Props) {
  return (
    <Table
      request={(pageSize, page) =>
        replyList({
          vid,
          limit: pageSize,
          offset: (page - 1) * pageSize,
          desc: true,
        }) as Promise<ListResponse>
      }
      extraColumsList={[
        {
          key: "xxxx",
          title: <Action />,
          render: () => {
            return (
              <Button
                type="primary"
                danger
                onClick={() => message.info("二次确认删除")}
                size="small"
              >
                <FormattedMessage id="global.delete" defaultMessage="删除" />
              </Button>
            );
          },
        },
      ]}
    />
  );
}
