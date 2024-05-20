import { ProForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Form, message } from "antd";
import { useRef } from "react";

import { PartitionSelector, TagSelector, UploadImg, Video as VideoPlayer } from "@/components";
import type { UploadImgInst } from "@/components/img/upload";
import { staticServerUrl } from "@/config";
import { FileSize } from "@/enums";
import { useI18n } from "@/hooks";
import { uploadImgControllerUploadVideoCover as videoCover } from "@/services/go_study_server/uploadImg";
import { videoControllerPublishVideo as submit } from "@/services/go_study_server/video";

interface Props {
  file: API.RGetFileVideos;
}

type UploadResponse = API.ResponseDto & {
  data: API.RUploadImgDto;
};

/**
 * 发布视频的表单
 */
export default function PulishVideoForm({ file }: Props) {
  const { t } = useI18n();
  /**
   * 保存的url链接
   */
  const urlRef = useRef<string | undefined>(undefined);
  /**
   * 上传图片的ref
   */
  const uploadRef = useRef<null | UploadImgInst>(null);
  return (
    <ProForm<API.PublishVideoDto>
      onReset={() => {
        urlRef.current = undefined; // 重置选择的图片
        uploadRef.current?.handleReset(); // 重置组件状态
      }}
      onFinish={async (form) => {
        await submit({
          file_id: file.file_id,
          video_name: form.video_name,
          description: form.description,
          partition_id: form.partition_id,
          tag_id_list: form.tag_id_list,
          video_cover: urlRef.current,
        });
        message.success(t("page.video.base.create.ok", "发布视频成功!"));
        history.replace("/video/base/manage");
      }}
    >
      <ProFormText
        name="video_name"
        required
        label={t("page.video.base.create.form.name", "视频标题")}
      />
      <ProFormTextArea
        name="description"
        label={t("page.video.base.create.form.description", "视频简介")}
      />
      <Form.Item label={t("page.video.base.create.form.video", "预览")}>
        <VideoPlayer
          sources={file.m3u8.map((item) => ({
            type: item.resolution,
            url: item.file_path,
          }))}
          rawI18n={t("global.raw", "原画")}
          width="800px"
        />
      </Form.Item>
      <PartitionSelector
        placeholder={t("global.form.please.select", "请选择")}
        name="partition_id"
        label={t("global.partition", "课程")}
      />
      <TagSelector
        placeholder={t("global.form.please.select", "请选择")}
        name="tag_id_list"
        label={t("global.tag", "标签")}
      />
      <Form.Item label={t("global.cover", "封面")}>
        <UploadImg
          ref={uploadRef}
          maxSize={FileSize.FILE_COVER_SIZE}
          request={async (file) => {
            const {
              data: { url },
            } = (await videoCover({} as any, file)) as UploadResponse;
            urlRef.current = url; // 注意内部图片不保存完整链接
            return staticServerUrl + url;
          }}
        />
      </Form.Item>
    </ProForm>
  );
}
