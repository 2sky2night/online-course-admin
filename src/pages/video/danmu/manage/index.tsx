import { FormattedMessage } from "@umijs/max";
import { Button, message } from "antd";

import { Action } from "@/components";
import { VideoDanmuTable } from "@/components";
import { videoDanmuControllerCommonList as commentList } from "@/services/go_study_server/videoDanmu";
import { VideoDanmuListResponse as ListResponse } from "@/types";

/**
 * 视频弹幕管理页
 */
export default function CommentManagePage() {
  return (
    <VideoDanmuTable
      request={(pageSize, page) =>
        commentList({
          desc: true,
          offset: (page - 1) * pageSize,
          limit: pageSize,
        }) as Promise<ListResponse>
      }
      tableProps={{
        headerTitle: (
          <FormattedMessage id="pages.video.danmu.manage.title" defaultMessage="弹幕管理" />
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
