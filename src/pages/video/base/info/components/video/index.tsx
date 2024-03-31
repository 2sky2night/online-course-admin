import { Video } from "@/components";
import { useI18n } from "@/hooks";
import { VideoSource } from "@/types";

interface Props {
  sources: VideoSource[];
}

/**
 * 视频播放器
 */
export default function VideoPlayer({ sources }: Props) {
  const { t } = useI18n();
  const urls = sources.map((item) => {
    return {
      url: item.file_path,
      type: item.resolution,
    };
  });
  return <Video sources={urls} rawI18n={t("global.raw", "原画")} />;
}
