import { Form, Select } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";

import { TagMaxCount } from "@/constants";
import { videoTagControllerList as tagList } from "@/services/go_study_server/videoTag";
import type { VideoTagItem } from "@/types";

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
  onChange?: (value: number[], list: VideoTagItem[]) => void;
  /**
   * 每次加载多少项
   */
  pageSize?: number;
  /**
   * 候选词
   */
  placeholder?: string;
  /**
   * 哪些项需要被禁用(传入禁用的id)
   */
  disabledList?: number[];
  /**
   * 渲染表单项组件？
   */
  renderForm?: boolean;
}

type ListResponse = {
  data: {
    list: VideoTagItem[];
    has_more: boolean;
  };
};

/**
 * 标签多选选择器
 */
export default function TagSelector({
  label,
  name = "tagIdList",
  pageSize = 20,
  onChange = () => {},
  placeholder = "请选择标签",
  disabledList,
  renderForm = true,
}: Props) {
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(false);
  const [list, setList] = useState<VideoTagItem[]>([]);
  const options = useMemo(() => {
    const items = list.map((item) => {
      return {
        value: item.tag_id,
        label: item.tag_name,
        disabled: false,
      };
    });
    if (disabledList?.length) {
      // 哪些需要被禁用
      items.forEach((item) => {
        item.disabled = disabledList.includes(item.value);
      });
    }
    return items;
  }, [list, disabledList]);
  const handleRequset = async () => {
    setLoading(true);
    const {
      data: { list, has_more },
    } = (await tagList({
      limit: pageSize,
      offset: (pageRef.current - 1) * pageSize,
      desc: true,
    })) as ListResponse;
    setList((v) => [...v, ...list]);
    pageRef.current = pageRef.current + 1;
    hasMoreRef.current = has_more;
    setLoading(false);
  };
  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    if (!hasMoreRef.current || loading) return;
    const { scrollHeight, clientHeight, scrollTop } = e.currentTarget;
    if (clientHeight + scrollTop >= scrollHeight) {
      handleRequset();
    }
  };
  /**
   * 更新的回调
   */
  const handleChange = (value: number[]) => {
    // 过滤出选择的标签
    const tags = list.filter((tag) => {
      return value.includes(tag.tag_id);
    });
    onChange(value, tags);
  };
  useEffect(() => {
    handleRequset();
  }, []);
  const select = (
    <Select
      mode="multiple"
      allowClear
      maxCount={TagMaxCount}
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
