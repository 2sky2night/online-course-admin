import { history, useIntl } from "@umijs/max";
import { Button, Result } from "antd";
import React from "react";

export default function NoFoundPage() {
  const { formatMessage } = useIntl();
  return (
    <Result
      status="404"
      title="404"
      subTitle={formatMessage({ id: "pages.404.subTitle" })}
      extra={
        <Button type="primary" onClick={() => history.replace("/")}>
          {formatMessage({ id: "global.back" })}
        </Button>
      }
    />
  );
}
