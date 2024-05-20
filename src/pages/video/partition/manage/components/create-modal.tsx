import type { ProFormInstance } from "@ant-design/pro-components";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { useRef, useState } from "react";

import { useI18n } from "@/hooks";
import { videoPartitionControllerAddPartition as createPartition } from "@/services/go_study_server/videoPartition";

interface Props {
  onSubmit: () => void;
}

export default function CreatePartitionModal({ onSubmit }: Props) {
  const { t } = useI18n();
  const restFormRef = useRef<ProFormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ModalForm<{ partition_name: string }>
      title={t("pages.video.parition.manage.create", "创建课程")}
      formRef={restFormRef}
      open={modalVisible}
      trigger={
        <Button type="primary">{t("pages.video.parition.manage.create", "创建课程")}</Button>
      }
      onOpenChange={setModalVisible}
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
        try {
          await createPartition({ partition_name });
          message.success(t("pages.video.parition.manage.createOk", "创建视频课程成功!"));
          restFormRef.current?.resetFields();
          onSubmit();
          return true;
        } catch (error) {
          return false;
        }
      }}
    >
      <ProFormText width="md" name="partition_name" label={t("global.partition.name", "课程名")} />
    </ModalForm>
  );
}
