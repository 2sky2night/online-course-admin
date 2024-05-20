import type { ProFormInstance } from "@ant-design/pro-components";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { FormattedMessage } from "@umijs/max";
import { Button, message } from "antd";
import { useRef, useState } from "react";

import { PartitionSelector } from "@/components";
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
      partitionId: number | null;
    }>
      title={
        <FormattedMessage id="pages.video.collection.manage.create" defaultMessage="创建课程章节" />
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
            defaultMessage="创建课程章节"
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
      onFinish={async ({ description, collection_name, partitionId }) => {
        try {
          await createCollection({
            collection_name,
            description: description || undefined,
            partition_id: partitionId || undefined,
          });
          message.success(
            <FormattedMessage
              id="pages.video.collection.manage.createOk"
              defaultMessage="创建课程章节成功!"
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
        label={<FormattedMessage id="global.collection.name" defaultMessage="课程章节名" />}
      />
      <ProFormText
        width="md"
        name="description"
        label={<FormattedMessage id="global.description" defaultMessage="描述" />}
      />
      <PartitionSelector
        renderForm
        label={<FormattedMessage id="global.partition" defaultMessage="课程" />}
        name="partitionId"
      />
    </ModalForm>
  );
}
