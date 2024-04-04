import { FormattedMessage } from "@umijs/max";

import { Tabs } from "@/components";
import { TabItem } from "@/components/tabs";
import { VideoInfo } from "@/types";

import {
  VideoCommentTable,
  VideoDanmuTable,
  VideoDataForm,
  VideoInfoForm,
  VideoPlayer,
  VideoReplyTable,
} from "../";

interface Props {
  data: VideoInfo;
}

enum TabKeys {
  INFO = "info",
  DATA = "data",
  VIDEO = "video",
  COMMENT = "comment",
  REPLY = "reply",
  DANMU = "danmu",
}

/**
 * 视频详情信息中部的tabs组件
 * @returns
 */
export default function VideoInfoMain({ data }: Props) {
  const items: TabItem<TabKeys> = [
    {
      key: TabKeys.INFO,
      label: <FormattedMessage id="pages.video.base.info.baseTitle" defaultMessage="基本信息" />,
      children: <VideoInfoForm data={data} />,
    },
    {
      key: TabKeys.DATA,
      label: <FormattedMessage id="pages.video.base.info.dataTitle" defaultMessage="数据信息" />,
      children: <VideoDataForm data={data} />,
    },
    {
      key: TabKeys.VIDEO,
      label: <FormattedMessage id="pages.video.base.info.videoTitle" defaultMessage="视频" />,
      children: <VideoPlayer sources={data.source} />,
    },
    {
      key: TabKeys.COMMENT,
      label: <FormattedMessage id="pages.video.base.info.commentTitle" defaultMessage="评论" />,
      children: <VideoCommentTable vid={data.video_id} />,
    },
    {
      key: TabKeys.REPLY,
      label: <FormattedMessage id="pages.video.base.info.replyTitle" defaultMessage="回复" />,
      children: <VideoReplyTable vid={data.video_id} />,
    },
    {
      key: TabKeys.DANMU,
      label: <FormattedMessage id="pages.video.base.info.danmuTitle" defaultMessage="弹幕" />,
      children: <VideoDanmuTable vid={data.video_id} />,
    },
  ];
  return (
    <Tabs
      queryParam="tab"
      keys={[
        TabKeys.INFO,
        TabKeys.VIDEO,
        TabKeys.DATA,
        TabKeys.COMMENT,
        TabKeys.REPLY,
        TabKeys.DANMU,
      ]}
      defaultKeys={TabKeys.INFO}
      items={items}
    />
  );
}
