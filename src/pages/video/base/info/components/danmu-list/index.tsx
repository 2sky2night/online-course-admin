import { FormattedMessage } from "@umijs/max";
import { Button, message } from "antd";

import { Action, VideoDanmuTable as Table } from "@/components";
import { videoDanmuControllerDanmuListInVideo as danmuList } from "@/services/go_study_server/videoDanmu";
import type { VideoDanmuListResponse as ListResponse } from "@/types";

interface Props {
  vid: number;
}

/**
 * 某个视频下的弹幕列表
 */
export default function VideoDanmuTable({ vid }: Props) {
  return (
    <Table
      request={(pageSize, page) =>
        danmuList({
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
