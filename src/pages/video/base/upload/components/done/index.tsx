import { FormattedMessage, history } from "@umijs/max";
import { Button, Result } from "antd";
import { useEffect } from "react";

import { useI18n } from "@/hooks";
import { globalErrorMsg } from "@/utils";

interface Props {
  fileId: number | null;
}

/**
 * 完成所有步骤的引导页
 */
export default function DoneFile({ fileId }: Props) {
  const { t } = useI18n();

  useEffect(() => {
    if (fileId === null) {
      globalErrorMsg(t, "error", "global.action.error", "操作失败!");
    }
  }, []);
  return (
    <Result
      status="success"
      title={<FormattedMessage id="global.toUploadFile.ok" defaultMessage="上传文件成功!" />}
      subTitle={
        <FormattedMessage
          id="pages.video.base.upload.tips"
          defaultMessage="所有的上传步骤都完成了，你现在可以发布视频了!"
        />
      }
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => history.push("/video/base/create?file_id=" + fileId)}
        >
          <FormattedMessage id="pages.video.base.upload.publishVideo" defaultMessage="发布视频" />
        </Button>,
      ]}
    />
  );
}
