import { FormattedMessage } from "@umijs/max";
interface Props {
  title: {
    id: string;
    dv: string;
  };
}

/**
 * 页面标题
 */
export default function Title({ title }: Props) {
  return (
    <h1>
      <FormattedMessage id={title.id} defaultMessage={title.dv} />
    </h1>
  );
}
