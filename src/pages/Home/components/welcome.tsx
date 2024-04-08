import { FormattedMessage } from "@umijs/max";
import { Flex } from "antd";
import { useAntdToken } from "antd-style";

import { Account } from "@/types";

interface Props {
  user: Account;
}

/**
 * 系统监控可视化面盘
 */
export default function Welcome({ user }: Props) {
  const { sizeLG } = useAntdToken();
  return (
    <>
      <Flex>
        <span style={{ fontSize: `${sizeLG}px` }}>
          <FormattedMessage id="page.home.hellow" defaultMessage="你好" />,{user.account_name}😊
        </span>
      </Flex>
    </>
  );
}
