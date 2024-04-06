import { ProForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Card, Form, message } from "antd";
import { useRef } from "react";

import { UploadImg } from "@/components";
import type { UploadImgInst } from "@/components/img/upload";
import { staticServerUrl } from "@/config";
import { FileSize } from "@/enums";
import { useI18n } from "@/hooks";
import { uploadImgControllerUploadVideoCover as videoCover } from "@/services/go_study_server/uploadImg";
import { videoControllerUpdateInfo as submit } from "@/services/go_study_server/video";
import type { VideoInfo } from "@/types";

interface Props {
  data: VideoInfo;
}

type UploadResponse = API.ResponseDto & {
  data: API.RUploadImgDto;
};

export default function EditVideoInfo({ data }: Props) {
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
    <Card type="inner" title={t("page.video.base.edit.card.info", "基本信息")}>
      <ProForm
        onReset={() => {
          urlRef.current = undefined; // 重置选择的图片
          uploadRef.current?.handleReset(); // 重置组件状态
        }}
        onFinish={async (form) => {
          await submit(
            { vid: data.video_id },
            {
              video_name: form.video_name,
              description: form.description,
              video_cover: urlRef.current,
            },
          );
          message.success(t("page.video.base.edit.ok", "修改视频信息成功!"));
          history.replace("/video/base/info/" + data.video_id); // 回到视频详情页中
        }}
      >
        <ProFormText
          name="video_name"
          required
          initialValue={data.video_name}
          label={t("page.video.base.create.form.name", "视频标题")}
        />
        <ProFormTextArea
          name="description"
          initialValue={data.description}
          label={t("page.video.base.create.form.description", "视频简介")}
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
    </Card>
  );
}
