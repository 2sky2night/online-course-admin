import type { Settings as LayoutSettings } from "@ant-design/pro-components";

export interface InitialState {
  user: null | Record<string, any>;
  config: {
    isDark: boolean;
  };
  settings?: Partial<LayoutSettings>;
}
