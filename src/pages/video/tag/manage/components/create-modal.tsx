import type { ProFormInstance } from "@ant-design/pro-components";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Button, message } from "antd";
import { useRef, useState } from "react";

import { useI18n } from "@/hooks";
import { videoTagControllerAddTag as createTag } from "@/services/go_study_server/videoTag";

interface Props {
  onSubmit: () => void;
}

export default function CreateTagModal({ onSubmit }: Props) {
  const { t } = useI18n();
  const restFormRef = useRef<ProFormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ModalForm<{ tag_name: string }>
      title={t("pages.video.tag.manage.create", "创建标签")}
      formRef={restFormRef}
      open={modalVisible}
      trigger={<Button type="primary">{t("pages.video.tag.manage.create", "创建标签")}</Button>}
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
      onFinish={async ({ tag_name }) => {
        try {
          await createTag({ tag_name });
          message.success(t("pages.video.tag.manage.createOk", "创建视频标签成功!"));
          restFormRef.current?.resetFields();
          onSubmit();
          return true;
        } catch (error) {
          return false;
        }
      }}
    >
      <ProFormText width="md" name="tag_name" label={t("global.tag.name", "标签")} />
    </ModalForm>
  );
}
