import { VideoTable } from "@/components";
import { videoControllerPartitionList as videoList } from "@/services/go_study_server/video";
import { VideoListRepsonse } from "@/types";

interface Props {
  pid: number;
}

/**
 * 分区下的视频列表
 */
export default function PartitionVideoList({ pid }: Props) {
  return (
    <VideoTable
      request={async (pageSize: number, page: number) => {
        const res = (await videoList({
          offset: (page - 1) * pageSize,
          limit: pageSize,
          desc: true,
          pid,
        })) as VideoListRepsonse;
        return res;
      }}
    />
  );
}
