import { history, useIntl } from "@umijs/max";
import { Button, Result } from "antd";
import React from "react";

export default function ServerErrorPage() {
  const { formatMessage } = useIntl();
  return (
    <Result
      status="500"
      title="500"
      subTitle={formatMessage({
        id: "pages.500.subTitle",
        defaultMessage: "系统错误，请稍后再试!",
      })}
      extra={
        <Button type="primary" onClick={() => history.replace("/")}>
          {formatMessage({ id: "global.back", defaultMessage: "返回" })}
        </Button>
      }
    />
  );
}
