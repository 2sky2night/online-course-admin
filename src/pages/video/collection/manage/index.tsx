import { ActionType, ProTable } from "@ant-design/pro-components";
import { FormattedMessage } from "@umijs/max";
import { Form, Input, message, Modal } from "antd";
import { useMemo, useRef, useState } from "react";

import { PartitionSelector, Role } from "@/components";
import { Roles } from "@/enums";
import { useI18n } from "@/hooks";
import {
  videoCollectionControllerList as collectionList,
  videoCollectionControllerUpdateInfo as editInfo,
  videoCollectionControllerUpdatePartition as updatePartition,
} from "@/services/go_study_server/videoCollection";
import type { PageParamsP, VideoCollection } from "@/types";

import { CreateCollectionModal } from "./components";
import { colunmsRender } from "./config";
import type { VideoCollectionListResponse as ListResponse } from "./types";

export default function VideoCollectionManagePage() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  // 编辑的课程章节数据
  const [data, setData] = useState<{
    collection_name: string;
    description: string;
    collection_id: null | number;
    partitionId: null | number;
  }>({
    collection_name: "",
    description: "",
    collection_id: null,
    partitionId: null,
  });
  const [loading, setLoading] = useState(false);
  const actionRef = useRef<ActionType | null>(null);
  // 打开编辑的模态框
  const handleOpen = (entity: VideoCollection) => {
    setData({
      collection_name: entity.collection_name,
      description: entity.description ? entity.description : "",
      collection_id: entity.collection_id,
      partitionId: null, // TODO 列表不会查询分区的信息，所以置为空
    });
    setOpen(true);
  };
  const table = useMemo(() => {
    return (
      <ProTable<VideoCollection, PageParamsP>
        actionRef={actionRef}
        headerTitle={t("pages.video.collection.title", "课程章节管理")}
        rowKey="collection_id"
        toolBarRender={(d) => {
          const refresh = () => {
            d?.reload();
          };
          return [
            <Role
              key="0"
              roles={[Roles.TEACHER]}
              Component={() => {
                return <CreateCollectionModal onSubmit={refresh} />;
              }}
            />,
          ];
        }}
        columns={colunmsRender(handleOpen)}
        request={async (params: { pageSize?: number; current?: number }) => {
          const { current = 1, pageSize = 20 } = params;
          const {
            data: { list, total },
          } = (await collectionList({
            offset: (current - 1) * pageSize,
            limit: pageSize,
            desc: true,
          })) as ListResponse;
          return {
            data: list,
            success: true,
            total,
          };
        }}
      />
    );
  }, []);
  return (
    <>
      <Modal
        destroyOnClose
        open={open}
        title={
          <FormattedMessage id="pages.video.collection.manage.edit" defaultMessage="编辑课程章节" />
        }
        confirmLoading={loading}
        onCancel={() => {
          setOpen(false);
          setData({
            collection_name: "",
            description: "",
            collection_id: null,
          });
        }}
        onOk={async () => {
          setLoading(true);
          // 请求体
          const body: Record<string, string | number> = {};
          if (data.collection_name) body.collection_name = data.collection_name;
          if (data.description) body.description = data.description;
          try {
            await editInfo(
              {
                cid: data.collection_id as number,
              },
              body as any,
            );
            if (data.partitionId) {
              await updatePartition(
                {
                  cid: data.collection_id as number,
                },
                { partition_id: data.partitionId },
              );
            }
            message.success(
              <FormattedMessage
                id="pages.video.collection.manage.editOk"
                defaultMessage="编辑课程章节成功!"
              />,
            );
            actionRef.current?.reload();
          } finally {
            setOpen(false);
            setLoading(false);
            setData({
              collection_name: "",
              description: "",
              collection_id: null,
              partitionId: null,
            });
          }
        }}
      >
        <Form>
          <Form.Item
            label={<FormattedMessage id="global.collection.name" defaultMessage="课程章节名" />}
          >
            <Input
              value={data.collection_name}
              onChange={(e) => {
                setData((v) => {
                  return {
                    ...v,
                    collection_name: e.currentTarget.value,
                  };
                });
              }}
            />
          </Form.Item>
          <Form.Item label={<FormattedMessage id="global.description" defaultMessage="描述" />}>
            <Input.TextArea
              value={data.description}
              onChange={(e) => {
                setData((v) => {
                  return {
                    ...v,
                    description: e.currentTarget.value,
                  };
                });
              }}
            ></Input.TextArea>
          </Form.Item>
          <PartitionSelector
            renderForm
            label={<FormattedMessage id="global.partition" defaultMessage="课程" />}
            name="partitionId"
            onChange={(value) => setData((v) => ({ ...v, partitionId: value }))}
          />
        </Form>
      </Modal>
      {table}
    </>
  );
}
