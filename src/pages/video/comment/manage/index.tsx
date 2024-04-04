import { FormattedMessage } from "@umijs/max";
import { Button, message } from "antd";

import { Action } from "@/components";
import VideoCommentTable from "@/components/table/comment";
import { videoCommentControllerCommonList as commentList } from "@/services/go_study_server/videoComment";
import { VideoCommentListResponse as ListResponse } from "@/types";

/**
 * 视频评论管理页
 */
export default function CommentManagePage() {
  return (
    <VideoCommentTable
      request={(pageSize, page) =>
        commentList({
          desc: true,
          offset: (page - 1) * pageSize,
          limit: pageSize,
        }) as Promise<ListResponse>
      }
      tableProps={{
        headerTitle: (
          <FormattedMessage id="pages.video.comment.manage.title" defaultMessage="评论管理" />
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
