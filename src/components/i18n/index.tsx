import { useIntl } from "@umijs/max";
import type { CSSProperties } from "react";
import { createElement } from "react";

interface Props {
  /**
   * 用什么标签创建？默认span
   */
  tagName?: string;
  /**
   * local的id
   */
  id: string;
  /**
   * 默认值，不填写在不生效时会默认为id的值
   */
  dv?: string;
  /**
   * 使用此选项会渲染Component
   * @returns
   */
  Component?: (props: {
    /**
     * 国际化后的文本
     */
    text: string;
  }) => JSX.Element;
  style?: CSSProperties;
  className?: string;
}

/**
 * 国际化组件
 * @returns
 */
export default function I18n({ id, style, className, tagName, dv, Component }: Props) {
  const i = useIntl();
  const text = i.formatMessage({ id, defaultMessage: dv ? dv : id });
  if (Component) {
    return <Component text={text} />;
  } else {
    return createElement(
      tagName || "span",
      {
        style,
        className,
      },
      text,
    );
  }
}
