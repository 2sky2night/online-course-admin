import { FormattedMessage } from "@umijs/max";
import { Button, Form,message, Modal } from "antd";
import { useState } from "react";

import { VideoPermission, VideoSelector } from "@/components";
import { videoControllerGetTeacherVideoList as videoList } from "@/services/go_study_server/video";
import { videoCollectionControllerAddVideos as addVideos } from "@/services/go_study_server/videoCollection";

type Response = API.ResponseDto & {
  data: { list: API.RVideoListItemDto[]; total: number; has_more: boolean };
};

interface Props {
  collectionId: number;
  creatorId: number;
  /**
   * 添加完成的回调
   */
  onFinsh: () => void;
}

export default function Select({ collectionId, creatorId, onFinsh }: Props) {
  const [idList, setIdList] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setIdList([]);
    setOpen(false);
  };
  const handleOk = async () => {
    setLoading(true);
    try {
      await addVideos(
        {
          cid: collectionId,
        },
        { video_id_list: idList },
      );
      message.success(
        <FormattedMessage
          id="pages.video.collection.info.add.video.ok"
          defaultMessage="添加视频成功!"
        />,
      );
      onFinsh();
    } finally {
      handleCancel();
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
        confirmLoading={loading}
        title={
          <FormattedMessage id="pages.video.collection.info.add.video" defaultMessage="添加视频" />
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form.Item>
          <VideoSelector
            values={idList}
            onChange={(list) => setIdList(list)}
            request={async (pageSize, page) => {
              try {
                const { data } = (await videoList({
                  tid: creatorId,
                  desc: true,
                  limit: pageSize,
                  offset: (page - 1) * pageSize,
                })) as Response;
                return {
                  list: data.list,
                  has_more: data.has_more,
                };
              } catch (error) {
                return {
                  list: [],
                  has_more: false,
                };
              }
            }}
          />
        </Form.Item>
      </Modal>
      <VideoPermission
        toAdmin={false}
        creatorId={creatorId}
        Component={() => {
          return (
            <Button type="primary" onClick={() => setOpen(true)}>
              <FormattedMessage
                id="pages.video.collection.info.add.video"
                defaultMessage="添加视频"
              />
            </Button>
          );
        }}
      />
    </>
  );
}
