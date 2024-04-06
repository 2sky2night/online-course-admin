import { Select } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";

import { useI18n } from "@/hooks";
import { VideoItem } from "@/types";

import VideoSelectLabel from "./item";
import type { Props } from "./types";

/**
 * 视频多选器
 */
export default function VideoSelector({ onChange, values, request, pageSize = 20 }: Props) {
  const { t } = useI18n();
  const [list, setList] = useState<VideoItem[]>([]);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const handleRequest = async () => {
    setLoading(true);
    try {
      const { list: videoList, has_more } = await request(pageSize, pageRef.current);
      setList([...list, ...videoList]);
      pageRef.current = pageRef.current + 1;
      hasMoreRef.current = has_more;
    } finally {
      setLoading(false);
    }
  };
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (loading || !hasMoreRef.current) return;
    const { clientHeight, scrollHeight, scrollTop } = e.currentTarget;
    if (clientHeight + scrollTop >= scrollHeight) {
      handleRequest();
    }
  };
  const options = useMemo(() => {
    return list.map((item) => ({ value: item.video_id, label: item.video_name, rawData: item })); // 保存的自定义信息
  }, [list]);
  useEffect(() => {
    handleRequest();
  }, []);
  return (
    <Select
      options={options}
      placeholder={t("global.form.please.select", "请选择")}
      mode="multiple"
      value={values}
      loading={loading}
      optionRender={(r) => {
        if (r.data.rawData) {
          return <VideoSelectLabel video={r.data.rawData} />;
        } else {
          // 兜底
          return <span>{r.data.label}</span>;
        }
      }}
      onChange={onChange}
      onPopupScroll={handleScroll}
    />
  );
}
