import { VideoTable } from "@/components";
import { videoTagControllerVideoList as videoList } from "@/services/go_study_server/videoTag";
import type { VideoListRepsonse } from "@/types";

interface Props {
  tid: number;
}

export default function TagVideoList({ tid }: Props) {
  return (
    <VideoTable
      request={(pageSize, page) => {
        return videoList({
          tid,
          offset: (page - 1) * pageSize,
          limit: pageSize,
          desc: true,
        }) as Promise<VideoListRepsonse>;
      }}
    />
  );
}
