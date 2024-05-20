import { Form, Select } from "antd";
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
  onChange?: (value: number, item?: VideoPartitionItem) => void;
  /**
   * 每次加载多少项
   */
  pageSize?: number;
  /**
   * 候选词
   */
  placeholder?: string;
  /**
   * 哪些需要被禁用
   */
  disabledList?: number[];
  /**
   * 渲染表单项组件？
   */
  renderForm?: boolean;
}

type ListResponse = API.ResponseDto & {
  data: {
    list: API.PartitionInfoDto[];
    total: number;
    has_more: boolean;
  };
};

/**
 * 课程选择器
 * @returns
 */
export default function PartitionSelector({
  label,
  name = "partitionId",
  pageSize = 20,
  onChange = () => {},
  placeholder = "请选择课程",
  disabledList = [],
  renderForm = true,
}: Props) {
  const [list, setList] = useState<VideoPartitionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(false);
  const options = useMemo(() => {
    const items = list.map((item) => {
      return {
        value: item.partition_id,
        label: item.partition_name,
        disabled: false,
      };
    });
    if (disabledList.length) {
      items.forEach((item) => {
        item.disabled = disabledList.includes(item.value);
      });
    }
    return items;
  }, [list, disabledList]);
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
  const handleChange = (value: number) => {
    const item = list.find((item) => item.partition_id === value); // 找出对应的元数据
    onChange(value, item);
  };
  useEffect(() => {
    handleRequest();
  }, []);
  const select = (
    <Select
      options={options}
      onPopupScroll={handleScroll}
      loading={loading}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
  return renderForm ? (
    <Form.Item name={name} label={label}>
      {select}
    </Form.Item>
  ) : (
    select
  );
}
