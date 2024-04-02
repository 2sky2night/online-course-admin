import { VideoCollectionTable } from "@/components";
import type { VideoCollectionListResponse } from "@/pages/video/collection/manage/types";
import { videoTagControllerCollectionList as collectionList } from "@/services/go_study_server/videoTag";

interface Props {
  tid: number;
}

export default function TagCollectionList({ tid }: Props) {
  return (
    <VideoCollectionTable
      request={(pageSize, page) => {
        return collectionList({
          tid,
          offset: (page - 1) * pageSize,
          limit: pageSize,
          desc: true,
        }) as Promise<VideoCollectionListResponse>;
      }}
    />
  );
}
