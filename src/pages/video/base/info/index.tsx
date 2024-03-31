import { ProSkeleton } from "@ant-design/pro-components";
import { history, useParams, useRequest } from "@umijs/max";

import { Title } from "@/components";
import { videoControllerInfo } from "@/services/go_study_server/video";
import { VideoInfo } from "@/types";

import { VideoInfoMain } from "./components";
/**
 * 视频详情页
 */
export default function VideoInfoPage() {
  const { video_id } = useParams();
  const { data, loading, error } = useRequest(() => {
    const value = Number(video_id);
    if (Number.isNaN(value)) {
      history.replace("/404");
      return Promise.reject();
    } else {
      return videoControllerInfo({
        vid: value,
      });
    }
  });
  if (loading || error) {
    return <ProSkeleton type="descriptions" />;
  } else {
    return (
      <div>
        <Title title={{ id: "pages.video.base.info.title", dv: "视频详情" }} />
        <VideoInfoMain data={data as VideoInfo} />
      </div>
    );
  }
}
