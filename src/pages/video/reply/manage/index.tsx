import { FormattedMessage } from "@umijs/max";
import { Button, message } from "antd";

import { Action } from "@/components";
import { VideoReplyTable } from "@/components";
import { videoReplyControllerCommonList as replyList } from "@/services/go_study_server/videoReply";
import { VideoReplyListResponse as ListResponse } from "@/types";

/**
 * 视频回复管理页
 */
export default function ReplyManagePage() {
  return (
    <VideoReplyTable
      request={(pageSize, page) =>
        replyList({
          desc: true,
          offset: (page - 1) * pageSize,
          limit: pageSize,
        }) as Promise<ListResponse>
      }
      tableProps={{
        headerTitle: (
          <FormattedMessage id="pages.video.reply.manage.title" defaultMessage="回复管理" />
        ),
      }}
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
