import { useAntdToken } from "antd-style";

import { Title } from "@/components";

import { EditInfo, EditPassword } from "./components";

/**
 * 编辑用户
 */
export default function AccountEditPage() {
  const { colorText } = useAntdToken();
  return (
    <div style={{ color: colorText }}>
      <Title title={{ id: "page.account.edit", dv: "编辑账户" }}></Title>
      <EditInfo></EditInfo>
      <EditPassword></EditPassword>
    </div>
  );
}
