import { FormattedMessage } from "@umijs/max";
import type { FormProps } from "antd";
import { Form } from "antd";
import moment from "moment";

export interface FormItem {
  /**
   * 表单的label设置，设置表单项标题的国际化
   */
  label: {
    id: string;
    dv: string;
  };
  /**
   * 表单的值
   */
  value?: any;
  /**
   * 想要自己渲染内容？
   * @param value 对应表单的值
   */
  render?: (value: any) => JSX.Element;
  /**
   * 值的类型
   */
  valueType?: "text" | "dateTime";
}

interface Props {
  /**
   * 表单中的每个字段
   */
  items: FormItem[];
  /**
   * antd表单的配置项
   */
  formProps?: FormProps;
}

/**
 * 渲染详情页的表单组件
 */
export default function InfoForm({ items, formProps }: Props) {
  const formItemNode = items.map(({ label, render, value, valueType }, index) => {
    let text = value || "-";
    if (value && valueType === "dateTime") {
      text = moment(value).format("LLL");
    }
    return (
      <Form.Item
        key={index}
        label={
          <span style={{ fontSize: "17px", fontWeight: 600 }}>
            <FormattedMessage id={label.id} defaultMessage={label.dv} />
          </span>
        }
      >
        {render ? render(value) : <span>{text}</span>}
      </Form.Item>
    );
  });
  return <Form {...formProps}>{formItemNode}</Form>;
}
