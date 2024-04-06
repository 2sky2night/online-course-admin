import { Form,Select } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";

import { videoPartitionControllerList as partitionList } from "@/services/go_study_server/videoPartition";
import type { VideoPartitionItem } from "@/types";

interface Props {
  /**
   * 是否渲染表单标签
   */
  label?: string;
  /**
   * 表单项收集的值（若是表单则可以在提交时通过name收集值）
   */
  name?: string;
  /**
   * 选择更新的回调
   */
  onChange?: (value: number) => void;
  /**
   * 每次加载多少项
   */
  pageSize?: number;
  /**
   * 候选词
   */
  placeholder?: string;
}

type ListResponse = API.ResponseDto & {
  data: {
    list: API.PartitionInfoDto[];
    total: number;
    has_more: boolean;
  };
};

/**
 * 分区选择器
 * @returns
 */
export default function PartitionSelector({
  label,
  name = "partitionId",
  pageSize = 20,
  onChange = () => {},
  placeholder = "请选择分区",
}: Props) {
  const [list, setList] = useState<VideoPartitionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(false);
  const options = useMemo(() => {
    return list.map((item) => {
      return {
        value: item.partition_id,
        label: item.partition_name,
      };
    });
  }, [list]);
  const handleRequest = async () => {
    setLoading(true);
    const { data } = (await partitionList({
      offset: (pageRef.current - 1) * pageSize,
      limit: pageSize,
      desc: true,
    })) as ListResponse;
    setList((v) => [...v, ...data.list]);
    setLoading(false);
    pageRef.current = pageRef.current + 1; // 页码更新
    hasMoreRef.current = data.has_more; // 更新是否还有更多
  };
  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    if (!hasMoreRef.current || loading) return;
    const { scrollHeight, clientHeight, scrollTop } = e.currentTarget;
    if (clientHeight + scrollTop >= scrollHeight) {
      handleRequest();
    }
  };
  useEffect(() => {
    handleRequest();
  }, []);
  return (
    <Form.Item name={name} label={label}>
      <Select
        options={options}
        onPopupScroll={handleScroll}
        loading={loading}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Form.Item>
  );
}
