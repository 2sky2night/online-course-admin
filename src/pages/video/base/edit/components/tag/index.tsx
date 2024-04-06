import { PlusOutlined as AddIcon } from "@ant-design/icons";
import { Button, Card, Form,message, Space, Tag } from "antd";
import { useMemo, useState } from "react";

import { TagSelector } from "@/components";
import { TagMaxCount } from "@/constants";
import { useI18n } from "@/hooks";
import {
  videoControllerAddVideoTags as addTags,
  videoControllerRemoveVideoTags as removeTags,
} from "@/services/go_study_server/video";

interface Props {
  videoId: number;
  /**
   * 视频当前的标签
   */
  tags: API.TagDto[];
}

/**
 * 点击标签close图标，可以移除标签
 * 点击创建，可以添加标签
 * @returns
 */
export default function EditVideoTag({ videoId, tags }: Props) {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  /**
   * 选择器渲染的标签(为了确定添加按钮的动态可用)
   */
  const [selectTags, setSelectTags] = useState<API.TagDto[]>([]);
  /**
   * 当前视频标签(为了在更新标签时同步视图)
   */
  const [nowTags, setNowTags] = useState(tags);
  /**
   * 需要禁用的标签(当前选择的标签不能选择)
   */
  const disabledList = useMemo(() => {
    return nowTags.map((item) => item.tag_id);
  }, [nowTags]);

  /**
   * 移除某个标签
   */
  const handleRemove = (id: number) => {
    removeTags({ vid: videoId }, { tag_id_list: [id] }).then(() => {
      const index = nowTags.findIndex((v) => v.tag_id === id);
      nowTags.splice(index, 1);
      setNowTags([...nowTags]);
      message.success(t("page.video.base.edit.detele.tag", "删除标签成功!"));
    });
  };
  /**
   * 取消添加这些标签
   */
  const cancelAddTags = () => {
    setSelectTags([]);
    setIsCreate(false);
  };
  /**
   * 确认添加这些标签
   */
  const handleAddTags = async () => {
    setLoading(true);
    try {
      await addTags(
        {
          vid: videoId,
        },
        { tag_id_list: selectTags.map((item) => item.tag_id) },
      );
      // 更新当前视频的标签
      setNowTags((v) => {
        return [...v, ...selectTags];
      });
      message.success(t("page.video.base.edit.add.tag", "添加标签成功!"));
    } finally {
      // 清空选择的标签
      cancelAddTags();
      // 取消加载态
      setLoading(false);
    }
  };

  /**
   * 不能选择超过十个标签
   */
  const maxCount = useMemo(() => {
    return nowTags.length + selectTags.length > TagMaxCount;
  }, [nowTags, selectTags]);
  return (
    <Card
      type="inner"
      title={t("page.video.base.edit.card.tag", "标签")}
      style={{ marginTop: "10px" }}
    >
      <Space>
        {nowTags.map((tag) => (
          <Tag key={tag.tag_id} closable onClose={() => handleRemove(tag.tag_id)}>
            {tag.tag_name}
          </Tag>
        ))}
      </Space>

      {isCreate ? (
        <Form.Item style={{ marginTop: "10px" }}>
          <TagSelector
            renderForm={false}
            onChange={(_, list) => setSelectTags([...list])}
            disabledList={disabledList}
            placeholder={t("global.form.please.select", "请选择")}
          />
          <Space style={{ marginTop: "10px" }}>
            <Button onClick={cancelAddTags} loading={loading}>
              {t("global.cancel", "取消")}
            </Button>
            <Button
              onClick={handleAddTags}
              disabled={!selectTags.length || maxCount}
              loading={loading}
              type="primary"
            >
              {t("global.confirm", "确认")}
            </Button>
          </Space>
        </Form.Item>
      ) : (
        <Tag
          style={{
            height: 22,
            borderStyle: "dashed",
            cursor: "pointer",
          }}
          icon={<AddIcon />}
          onClick={() => setIsCreate(true)}
        >
          {t("global.add", "添加")}
        </Tag>
      )}
    </Card>
  );
}
