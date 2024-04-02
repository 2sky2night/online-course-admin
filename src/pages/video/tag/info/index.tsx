import { ProSkeleton } from "@ant-design/pro-components";
import { FormattedMessage,history, useParams, useRequest } from "@umijs/max";

import { Tabs, Title } from "@/components";
import { videoTagControllerInfo as tagInfo } from "@/services/go_study_server/videoTag";
import type { VideoTagInfo } from "@/types";

import {
  TagCollectionList as CollectionList,
  TagInfoForm as InfoForm,
  TagVideoList as VideoList,
} from "./components";

enum TabKey {
  INFO = "info",
  VIDEOS = "videos",
  VIDEO_COLLECTIONS = "video-collections",
}

/**
 * 标签详情页
 */
export default function TagInfoPage() {
  const { tag_id } = useParams();
  const tid = Number(tag_id);
  const { data, loading, error } = useRequest(() => {
    if (Number.isNaN(tid)) {
      history.replace("/404");
      return Promise.reject();
    } else {
      return tagInfo({ tid });
    }
  });
  return loading || error ? (
    <ProSkeleton type="descriptions" />
  ) : (
    <>
      <Title title={{ id: "pages.video.tag.info.title", dv: "视频标签详情" }} />
      <Tabs
        queryParam="tab"
        keys={[TabKey.INFO, TabKey.VIDEOS, TabKey.VIDEO_COLLECTIONS]}
        defaultKeys={TabKey.INFO}
        items={[
          {
            key: TabKey.INFO,
            label: (
              <FormattedMessage id="pages.video.tag.info.infoTitle" defaultMessage="基本信息" />
            ),
            children: <InfoForm data={data as VideoTagInfo} />,
          },
          {
            key: TabKey.VIDEOS,
            label: (
              <FormattedMessage id="pages.video.tag.info.videoTitle" defaultMessage="视频管理" />
            ),
            children: <VideoList tid={tid} />,
          },
          {
            key: TabKey.VIDEO_COLLECTIONS,
            label: (
              <FormattedMessage
                id="pages.video.tag.info.videoCollectionTitle"
                defaultMessage="视频合集管理"
              />
            ),
            children: <CollectionList tid={tid} />,
          },
        ]}
      />
    </>
  );
}
