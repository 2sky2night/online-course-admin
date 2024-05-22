import type { ProFormInstance } from "@ant-design/pro-components";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { message } from "antd";
import { useRef } from "react";

import { useI18n } from "@/hooks";
import { videoPartitionControllerUpdatePartition as editPartition } from "@/services/go_study_server/videoPartition";

interface Props {
  onSubmit: () => void;
  editData: { name: string; id: number | null };
  show: boolean;
  onOpenChange: (v: boolean) => void;
}

export default function EditPartitionModal({ onSubmit, editData, show, onOpenChange }: Props) {
  const { t } = useI18n();
  const restFormRef = useRef<ProFormInstance>();

  return (
    <ModalForm<{ partition_name: string }>
      title={t("pages.video.parition.manage.edit", "编辑分区")}
      formRef={restFormRef}
      open={show}
      onOpenChange={onOpenChange}
      modalProps={{ destroyOnClose: true }}
      submitter={{
        searchConfig: {
          resetText: t("global.reset", "重置"),
        },
        resetButtonProps: {
          onClick: () => {
            restFormRef.current?.resetFields();
          },
        },
      }}
      onFinish={async ({ partition_name }) => {
        if (editData.id === null) return;
        try {
          await editPartition({ pid: editData.id }, { partition_name });
          message.success(t("pages.video.parition.manage.editOk", "编辑视频分区成功!"));
          restFormRef.current?.resetFields();
          onSubmit();
          return true;
        } catch (error) {
          return false;
        }
      }}
    >
      <ProFormText
        initialValue={editData.name}
        width="md"
        name="partition_name"
        label={t("global.partition.name", "分区名")}
      />
    </ModalForm>
  );
}
