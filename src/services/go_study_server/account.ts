// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 后台账户获取个人信息 根据token获取个人信息 GET /api/account/info */
export async function accountControllerGetInfoByToken(options?: { [key: string]: any }) {
  return request<API.ResponseDto & { data?: API.AccountInfoDto }>("/api/account/info", {
    method: "GET",
    ...(options || {}),
  });
}

/** 查询后台所有用户 查询后台所有用户 GET /api/account/list */
export async function accountControllerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AccountControllerListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & { data?: { list?: API.AccountInfoDto[]; total?: number; has_more?: boolean } }
  >("/api/account/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新账户密码 后台账户更新密码 POST /api/account/password */
export async function accountControllerUpdatePassword(
  body: API.UpdateAccountPasswordDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>("/api/account/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新账户信息 后台账户更新个人信息 PATCH /api/account/profile */
export async function accountControllerUpdateProfile(
  body: API.UpdateAccountProfileDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>("/api/account/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
