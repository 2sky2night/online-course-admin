import { Roles } from "@/enums";
import { useI18n } from "@/hooks";

interface Props {
  value: Roles;
  /**
   * hoc
   * 若有此选项，通过components渲染文本
   */
  Component?: (props: { id: string; dv: string }) => JSX.Element;
}

const roleMap = {
  [Roles.ADMIN]: {
    id: "global.role.admin",
    dv: "管理员",
  },
  [Roles.SUPER_ADMIN]: {
    id: "global.role.superAdmin",
    dv: "超级管理员",
  },
  [Roles.TEACHER]: {
    id: "global.role.teacher",
    dv: "老师",
  },
};

/**
 * 渲染角色文本
 */
export function Role({ value, Component }: Props) {
  const { t } = useI18n();
  const { id, dv } = roleMap[value];
  if (Component) {
    return <Component id={id} dv={dv} />;
  } else {
    return <span>{t(id, dv)}</span>;
  }
}
