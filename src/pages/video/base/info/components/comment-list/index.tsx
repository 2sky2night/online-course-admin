import { FormattedMessage } from "@umijs/max";
import { Button, message } from "antd";

import { Action, VideoCommentTable as Table } from "@/components";
import { videoCommentControllerList as commentList } from "@/services/go_study_server/videoComment";
import type { VideoCommentListResponse as ListResponse } from "@/types";

interface Props {
  vid: number;
}

/**
 * 某个视频下的评论列表
 */
export default function VideoCommentTable({ vid }: Props) {
  return (
    <Table
      request={(pageSize, page) =>
        commentList({
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
