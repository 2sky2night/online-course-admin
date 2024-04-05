import { FormattedMessage } from "@umijs/max";
import { Button, Space } from "antd";
import { useEffect, useRef, useState } from "react";

import { useI18n } from "@/hooks";
import { globalErrorMsg } from "@/utils";

interface Props {
  onFinsh: () => void;
  updateDataRef: (action: "file", value: File) => void;
}

/**
 * 选择文件
 */
export default function SelectFile({ onFinsh, updateDataRef }: Props) {
  const { t } = useI18n();
  const [isSelect, setIsSelect] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // 选择文件
  const handleSelect = () => {
    if (inputRef.current) {
      inputRef.current.click();
    } else {
      globalErrorMsg(t, "error", "global.select.file.error", "选择文件失败!");
    }
  };
  // 确认选择
  const handleConfirm = () => {
    if (inputRef.current?.files && inputRef.current.files[0]) {
      const file = inputRef.current.files[0];
      updateDataRef("file", file);
      onFinsh(); // 下一步
    } else {
      globalErrorMsg(t, "error", "global.select.file.error", "选择文件失败!");
    }
  };
  // 初次渲染
  useEffect(() => {
    const inputDom = inputRef.current;
    if (inputDom) {
      inputDom.addEventListener("change", () => {
        if (inputDom.files && inputDom.files[0]) {
          setIsSelect(true);
        } else {
          setIsSelect(false);
        }
      });
    }
  }, []);
  return (
    <>
      <input type="file" ref={inputRef} style={{ display: "none" }} accept="video/*" />
      <Space>
        <Button onClick={handleSelect}>
          {isSelect ? (
            <FormattedMessage id="global.isSelect.file" defaultMessage="已选择文件" />
          ) : (
            <FormattedMessage id="global.select.file" defaultMessage="选择文件" />
          )}
        </Button>
        <Button type="primary" onClick={handleConfirm} disabled={!isSelect}>
          <FormattedMessage id="global.confirm" defaultMessage="确认" />
        </Button>
      </Space>
    </>
  );
}
