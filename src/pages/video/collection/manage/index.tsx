import { ActionType, ProTable } from "@ant-design/pro-components";
import { FormattedMessage } from "@umijs/max";
import { Form, Input, message,Modal } from "antd";
import { useMemo, useRef, useState } from "react";

import { Role } from "@/components";
import { Roles } from "@/enums";
import { useI18n } from "@/hooks";
import {
  videoCollectionControllerList as collectionList,
  videoCollectionControllerUpdateInfo as editInfo,
} from "@/services/go_study_server/videoCollection";
import type { PageParamsP, VideoCollection } from "@/types";

import { CreateCollectionModal } from "./components";
import { colunmsRender } from "./config";
import type { VideoCollectionListResponse as ListResponse } from "./types";

export default function VideoCollectionManagePage() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  // 编辑的合集数据
  const [data, setData] = useState<{
    collection_name: string;
    description: string;
    collection_id: null | number;
  }>({
    collection_name: "",
    description: "",
    collection_id: null,
  });
  const [loading, setLoading] = useState(false);
  const actionRef = useRef<ActionType | null>(null);
  // 打开编辑的模态框
  const handleOpen = (entity: VideoCollection) => {
    setData({
      collection_name: entity.collection_name,
      description: entity.description ? entity.description : "",
      collection_id: entity.collection_id,
    });
    setOpen(true);
  };
  const table = useMemo(() => {
    return (
      <ProTable<VideoCollection, PageParamsP>
        actionRef={actionRef}
        headerTitle={t("pages.video.collection.title", "视频合集管理")}
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
        open={open}
        title={
          <FormattedMessage id="pages.video.collection.manage.edit" defaultMessage="编辑视频合集" />
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
          const body: Record<string, string> = {};
          if (data.collection_name) body.collection_name = data.collection_name;
          if (data.description) body.description = data.description;
          try {
            await editInfo(
              {
                cid: data.collection_id as number,
              },
              body as any,
            );
            message.success(
              <FormattedMessage
                id="pages.video.collection.manage.editOk"
                defaultMessage="编辑视频合集成功!"
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
            });
          }
        }}
      >
        <Form>
          <Form.Item>
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
          <Form.Item>
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
        </Form>
      </Modal>
      {table}
    </>
  );
}
