import { Button, Card, Form, message,Space } from "antd";
import { useState } from "react";

import { PartitionSelector } from "@/components";
import { useI18n } from "@/hooks";
import { videoControllerUpdateVideoPartition as editPartition } from "@/services/go_study_server/video";
interface Props {
  videoId: number;
  partition: API.PartitionDto | null;
}

export default function EditVideoPartition({ videoId, partition }: Props) {
  const { t } = useI18n();
  /**
   * 当前的分区信息
   */
  const [current, setCurrent] = useState<API.PartitionDto | null>(partition);
  /**
   * 当前选择的分区信息
   */
  const [select, setSelect] = useState<API.PartitionDto | null>(null);
  /**
   * 当前在编辑状态
   */
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setIsEdit(false);
    setSelect(null);
  };
  const handleSubmit = async () => {
    if (select) {
      setLoading(true);
      try {
        await editPartition(
          {
            vid: videoId,
          },
          { partition_id: select.partition_id },
        );
        setCurrent(select); // 更新视图
        message.success(t("page.video.base.edit.partition.ok", "更新分区成功!"));
      } finally {
        setLoading(false);
        handleCancel();
      }
    }
  };

  return (
    <Card
      type="inner"
      title={t("page.video.base.edit.card.partition", "分区")}
      style={{ marginTop: "10px" }}
    >
      {isEdit ? (
        <>
          <Form.Item>
            <PartitionSelector
              disabledList={current ? [current.partition_id] : []}
              onChange={(_, item) => {
                setSelect(item ? item : null);
              }}
              placeholder={t("global.form.please.select", "请选择")}
              renderForm={false}
            />
            <Space style={{ marginTop: "10px" }}>
              <Button onClick={handleCancel} loading={loading}>
                {t("global.cancel", "取消")}
              </Button>
              <Button onClick={handleSubmit} loading={loading} disabled={!select} type="primary">
                {t("global.confirm", "确认")}
              </Button>
            </Space>
          </Form.Item>
        </>
      ) : (
        <Space>
          <span>{current?.partition_name}</span>
          <Button onClick={() => setIsEdit(true)}>{t("global.edit", "修改")}</Button>
        </Space>
      )}
    </Card>
  );
}
