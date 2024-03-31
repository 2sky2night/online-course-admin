import { ProSkeleton } from "@ant-design/pro-components";
import { FormattedMessage, history, useParams, useRequest } from "@umijs/max";

import { Tabs, Title } from "@/components";
import { videoCollectionControllerInfo as collectionInfo } from "@/services/go_study_server/videoCollection";
import type { VideoCollectionInfo } from "@/types";

import { CollectionInfoForm, VideoList } from "./components";

enum TabsKey {
  INFO = "info",
  VIDEO = "video",
}

/**
 * 视频合集详情页
 */
export default function VideoCollectionInfoPage() {
  const { collection_id } = useParams();
  const collectionId = Number(collection_id);
  const { data, loading, error } = useRequest(() => {
    if (Number.isNaN(collectionId)) {
      history.replace("/404");
      return;
    }
    return collectionInfo({ cid: collectionId });
  });
  return loading || error ? (
    <ProSkeleton type="descriptions" />
  ) : (
    <>
      <Title title={{ id: "pages.video.collection.info.title", dv: "视频合集详情" }} />
      <Tabs
        queryParam="tab"
        defaultKeys={TabsKey.INFO}
        keys={[TabsKey.INFO, TabsKey.VIDEO]}
        items={[
          {
            key: TabsKey.INFO,
            label: (
              <FormattedMessage
                id="pages.video.collection.info.base.title"
                defaultMessage="基本信息"
              />
            ),
            children: <CollectionInfoForm data={data as VideoCollectionInfo} />,
          },
          {
            key: TabsKey.VIDEO,
            label: (
              <FormattedMessage
                id="pages.video.collection.info.video.title"
                defaultMessage="视频管理"
              />
            ),
            children: (
              <VideoList collectionId={collectionId} creatorId={data!.creator.account_id} />
            ),
          },
        ]}
      ></Tabs>
    </>
  );
}
