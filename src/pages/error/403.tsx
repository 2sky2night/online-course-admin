import { history, useIntl } from "@umijs/max";
import { Button, Result } from "antd";
import React from "react";

export default function NoAccessPage() {
  const { formatMessage } = useIntl();
  return (
    <Result
      status="403"
      title="403"
      subTitle={formatMessage({ id: "pages.403.subTitle" })}
      extra={
        <Button type="primary" onClick={() => history.replace("/")}>
          {formatMessage({ id: "global.back" })}
        </Button>
      }
    />
  );
}
