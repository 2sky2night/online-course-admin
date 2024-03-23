import { Button } from "antd";
import { useTheme } from "antd-style";

import { authUserControllerAlipayLogin } from "@/services/go_study_server/authUser";
export default function HomePage() {
  const theme = useTheme();
  const handleClick = () => {
    authUserControllerAlipayLogin({ code: "11" }).then((r) => {
      r.data?.access_token;
    });
  };
  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        111
      </Button>
      <div style={{ color: theme.colorText }}>111</div>
    </div>
  );
}
