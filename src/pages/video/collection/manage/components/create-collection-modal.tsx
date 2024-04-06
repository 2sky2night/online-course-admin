import type { ProFormInstance } from "@ant-design/pro-components";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { FormattedMessage } from "@umijs/max";
import { Button, message } from "antd";
import { useRef, useState } from "react";

import { videoCollectionControllerPublishCollection as createCollection } from "@/services/go_study_server/videoCollection";

interface Props {
  onSubmit: () => void;
}

export default function CreateCollectionModal({ onSubmit }: Props) {
  const restFormRef = useRef<ProFormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ModalForm<{
      collection_name: string;
      description: string;
    }>
      title={
        <FormattedMessage id="pages.video.collection.manage.create" defaultMessage="创建视频合集" />
      }
      formRef={restFormRef}
      open={modalVisible}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            setModalVisible(true);
          }}
        >
          <FormattedMessage
            id="pages.video.collection.manage.create"
            defaultMessage="创建视频合集"
          />
        </Button>
      }
      onOpenChange={setModalVisible}
      submitter={{
        searchConfig: {
          resetText: "重置",
        },
        resetButtonProps: {
          onClick: () => {
            restFormRef.current?.resetFields();
          },
        },
      }}
      onFinish={async ({ description, collection_name }) => {
        try {
          await createCollection({
            collection_name,
            description: description ? description : undefined,
          });
          message.success(
            <FormattedMessage
              id="pages.video.collection.manage.createOk"
              defaultMessage="创建视频合集成功!"
            />,
          );
          restFormRef.current?.resetFields();
          onSubmit();
          return true;
        } catch {
          return false;
        }
      }}
    >
      <ProFormText
        width="md"
        required
        name="collection_name"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage id="global.input.error.required" defaultMessage="请输入内容!" />
            ),
          },
        ]}
        label={<FormattedMessage id="global.collection.name" defaultMessage="合集名" />}
      />
      <ProFormText
        width="md"
        name="description"
        label={<FormattedMessage id="global.description" defaultMessage="描述" />}
      />
    </ModalForm>
  );
}
