import { useIntl } from "@umijs/max";

export default function useI18n() {
  const { formatMessage } = useIntl();

  return {
    t: (id: string, dv = id) => {
      return formatMessage({ id, defaultMessage: dv });
    },
  };
}
