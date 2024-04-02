import { VideoCollectionTable } from "@/components";
import { videoCollectionControllerPartitionList as collectionList } from "@/services/go_study_server/videoCollection";
import type { VideoCollectionResposne } from "@/types";

interface Props {
  pid: number;
}

/**
 * 视频合集列表
 */
export default function PartitionVideoCollectionList({ pid }: Props) {
  return (
    <VideoCollectionTable
      request={(pageSize, page) => {
        return collectionList({
          pid,
          offset: (page - 1) * pageSize,
          limit: pageSize,
          desc: true,
        }) as Promise<VideoCollectionResposne>;
      }}
    />
  );
}
