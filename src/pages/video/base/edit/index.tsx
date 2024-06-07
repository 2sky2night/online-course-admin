import { ProSkeleton } from "@ant-design/pro-components";
import { history, useParams, useRequest } from "@umijs/max";
import { useAntdToken } from "antd-style";

import { Title } from "@/components";
import { videoControllerInfo as videoInfo } from "@/services/go_study_server/video";
import type { VideoInfo } from "@/types";

import { EditVideoInfo } from "./components";
/**
 * 编辑视频页
 * 1.基本信息回显
 * 2.基本信息编辑
 * 3.课程编辑
 * 4.标签编辑
 */
export default function VideoEditPage() {
  const { colorText } = useAntdToken();
  const { video_id } = useParams();
  const videoId = Number(video_id);
  const { data, loading, error } = useRequest(() => {
    if (Number.isNaN(videoId)) {
      history.replace("/404");
      return Promise.reject();
    } else {
      return videoInfo({
        vid: videoId,
      });
    }
  });
  return loading || error ? (
    <ProSkeleton type="descriptions" />
  ) : (
    <div style={{ color: colorText }}>
      <Title title={{ id: "page.video.base.edit.title", dv: "编辑视频" }} />
      <EditVideoInfo data={data as VideoInfo} />
      {/* <EditVideoTag tags={(data as VideoInfo).tags} videoId={videoId} /> */}
      {/* <EditVideoPartition partition={(data as VideoInfo).partition} videoId={videoId} /> */}
    </div>
  );
}
