import { ProSkeleton } from "@ant-design/pro-components";
import { FormattedMessage, history, useParams, useRequest } from "@umijs/max";

import { Tabs, Title } from "@/components";
import { videoPartitionControllerInfo as partitionInfo } from "@/services/go_study_server/videoPartition";
import type { VideoPartitionInfo } from "@/types";

import {
  PartitionInfoForm as InfoForm,
  PartitionVideoCollectionList as CollectionList,
  PartitionVideoList as VideoList,
} from "./components";

enum TabKey {
  INFO = "info",
  VIDEOS = "videos",
  VIDEO_COLLECTIONS = "video-collections",
}

/**
 * 视频课程详情页
 */
export default function PartitionInfoPage() {
  const { partition_id } = useParams();
  const pid = Number(partition_id);
  const { data, loading, error } = useRequest(() => {
    if (Number.isNaN(pid)) {
      history.replace("/404");
      return Promise.reject();
    }
    return partitionInfo({ pid });
  });
  return loading || error ? (
    <ProSkeleton type="descriptions"></ProSkeleton>
  ) : (
    <>
      <Title title={{ id: "pages.video.parition.info.title", dv: "视频课程详情" }} />
      <Tabs
        queryParam="tab"
        keys={[TabKey.INFO, TabKey.VIDEOS, TabKey.VIDEO_COLLECTIONS]}
        defaultKeys={TabKey.INFO}
        items={[
          {
            label: (
              <FormattedMessage
                id="pages.video.parition.info.infoTitle"
                defaultMessage="基本信息"
              />
            ),
            key: TabKey.INFO,
            children: <InfoForm data={data as VideoPartitionInfo} />,
          },
          {
            label: (
              <FormattedMessage
                id="pages.video.parition.info.videoTitle"
                defaultMessage="视频管理"
              />
            ),
            key: TabKey.VIDEOS,
            children: <VideoList pid={pid} />,
          },
          {
            label: (
              <FormattedMessage
                id="pages.video.parition.info.videoCollectionTitle"
                defaultMessage="课程章节管理"
              />
            ),
            key: TabKey.VIDEO_COLLECTIONS,
            children: <CollectionList pid={pid} />,
          },
        ]}
      ></Tabs>
    </>
  );
}
