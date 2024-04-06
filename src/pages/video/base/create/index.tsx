import { ProSkeleton } from "@ant-design/pro-components";
import { history, useRequest,useSearchParams } from "@umijs/max";
import { useAntdToken } from "antd-style";

import { Title } from "@/components";
import { FileType } from "@/enums";
import { uploadVideoControllerGetFileVideos as fileInfo } from "@/services/go_study_server/uploadVideo";

import { PublishVideoForm } from "./components";

export default function VideoCreatePage() {
  const [search] = useSearchParams();
  const token = useAntdToken();
  const fileId = Number(search.get("file_id"));
  const { data, loading, error } = useRequest(async () => {
    if (Number.isNaN(fileId)) {
      // 参数校验
      history.replace("/404");
      return Promise.reject();
    } else {
      const result = await fileInfo({ fid: fileId });
      if (result.data?.file_type === FileType.VIDEO) {
        // 文件类型必须是视频类型的
        return result;
      } else {
        history.replace("/404");
        return Promise.reject();
      }
    }
  });
  return loading || error ? (
    <ProSkeleton type="descriptions" />
  ) : (
    <div style={{ color: token.colorText }}>
      <Title title={{ id: "pages.video.base.upload.publishVideo", dv: "发布视频" }} />
      <PublishVideoForm file={data as API.RGetFileVideos} />
    </div>
  );
}
