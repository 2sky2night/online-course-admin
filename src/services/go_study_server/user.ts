// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 获取用户信息 根据token获取用户信息 GET /api/user/info */
export async function userControllerInfo(options?: { [key: string]: any }) {
  return request<API.ResponseDto & { data?: API.UserInfoDto }>("/api/user/info", {
    method: "GET",
    ...(options || {}),
  });
}

/** 查询前台所有用户 查询前台所有用户 GET /api/user/list */
export async function userControllerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & { data?: { list?: API.UserInfoDto[]; total?: number; has_more?: boolean } }
  >("/api/user/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新用户信息 前台用户更新个人信息 PATCH /api/user/profile */
export async function userControllerUpdateProfile(
  body: API.UpdateUserProfileDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>("/api/user/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
