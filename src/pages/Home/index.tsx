import { Navigate, useModel } from "@umijs/max";
import { useTheme } from "antd-style";

import { Role } from "@/components";
import { Roles } from "@/enums";
import { InitialState } from "@/types";

import { SystemPanel, Welcome } from "./components";

export default function HomePage() {
  const theme = useTheme();
  const { account } = useModel("@@initialState", (v) => v.initialState) as InitialState;
  if (account === null) return <Navigate to="/login" />;
  return (
    <div style={{ color: theme.colorText }}>
      <Welcome user={account} />
      <Role roles={[Roles.SUPER_ADMIN]} Component={() => <SystemPanel />} />
    </div>
  );
}
