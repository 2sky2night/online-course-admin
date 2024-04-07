import { Navigate, useModel } from "@umijs/max";
import { Button, Card, Form, Input, message,Space } from "antd";
import { useState } from "react";

import { UploadImg } from "@/components";
import { FileSize } from "@/enums";
import { useI18n } from "@/hooks";
import { accountControllerUpdateProfile as editInfo } from "@/services/go_study_server/account";
import { uploadImgControllerUploadAccountAvatar as uploadAvatar } from "@/services/go_study_server/uploadImg";

interface Data {
  accountName: string;
  avatar: string | null;
}

/**
 * 编辑用户信息
 */
export default function EditInfo() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  /**
   * 当前用户的信息
   */
  const { initialState, setInitialState } = useModel("@@initialState");
  /**
   * 表单域
   */
  const [data, setData] = useState<Data>({
    accountName: initialState?.account?.account_name as Data["accountName"],
    avatar: initialState?.account?.avatar as Data["avatar"],
  });
  if (!initialState?.account) {
    return <Navigate to="/500" />;
  }
  /**
   * 提交更新
   */
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const body: API.UpdateAccountProfileDto = {};
      // 检测哪些字段更新了
      if (initialState?.account?.account_name !== data.accountName)
        body.account_name = data.accountName;
      if (initialState?.account?.avatar !== data.avatar) body.avatar = data.avatar as string;
      await editInfo(body);
      message.success(t("page.account.edit.info.ok", "编辑账户信息成功!"));
      // 更新全局数据
      setInitialState((v) => {
        return {
          ...v,
          account: {
            ...v!.account,
            ...body,
          },
        } as any;
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card
      type="inner"
      title={t("page.account.edit.info", "基本信息")}
      style={{ marginBottom: "10px" }}
    >
      <Form.Item label={t("page.account.edit.info.accoutName", "账户名")}>
        <Input value={data.accountName}></Input>
      </Form.Item>
      <Form.Item label={t("page.account.edit.info.avatar", "头像")}>
        <UploadImg
          maxSize={FileSize.FILE_AVATAR_SIZE}
          request={async (file) => {
            const { data: res } = await uploadAvatar({} as any, file);
            const url = res!.url;
            // 选择的头像更新了，表单域也要更新
            setData({
              ...data,
              avatar: url,
            });
            return url;
          }}
        />
      </Form.Item>
      <Space>
        <Button
          loading={loading}
          onClick={() => {
            setData({
              accountName: initialState?.account?.account_name as Data["accountName"],
              avatar: initialState?.account?.avatar as Data["avatar"],
            });
          }}
        >
          {t("global.reset", "重置")}
        </Button>
        <Button type="primary" loading={loading} onClick={handleSubmit}>
          {t("global.submit", "提交")}
        </Button>
      </Space>
    </Card>
  );
}
