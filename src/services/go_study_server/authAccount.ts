// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 申请注册 游客申请注册到后台应用中，只能申请管理员和老师的角色 POST /api/auth/account/apply */
export async function authAccountControllerApply(
  body: API.ApplyAccountDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.RApplyAccountDto }>("/api/auth/account/apply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询申请注册记录 超级管理员查询申请注册记录 GET /api/auth/account/apply/list */
export async function authAccountControllerGetApplyList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AuthAccountControllerGetApplyListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & {
      data?: { list?: API.ApplyRegisterInfoDto[]; total?: number; has_more?: boolean };
    }
  >("/api/auth/account/apply/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 审批注册申请 超级管理员审批注册申请 POST /api/auth/account/approval */
export async function authAccountControllerApproval(
  body: API.ApprovalAccountDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>("/api/auth/account/approval", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询审批申请注册记录 超级管理员查询审批申请注册记录 GET /api/auth/account/approval/list */
export async function authAccountControllerGetApprovalList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AuthAccountControllerGetApprovalListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & {
      data?: { list?: API.ApprovalLogInfoDto[]; total?: number; has_more?: boolean };
    }
  >("/api/auth/account/approval/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登录 登录后台应用 POST /api/auth/account/login */
export async function authAccountControllerLogin(
  body: API.LoginAccountDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.RLoginAccountDto }>("/api/auth/account/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 邮箱验证码登录 邮箱验证码登录后台应用 POST /api/auth/account/login/email */
export async function authAccountControllerEmailLogin(
  body: API.EmailLoginDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.REmailAccountDto }>(
    "/api/auth/account/login/email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 获取邮箱登录验证码 登录后台应用时通过邮箱获取验证码 POST /api/auth/account/login/email/code */
export async function authAccountControllerGetLoginCode(
  body: API.EmailCodeDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>("/api/auth/account/login/email/code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/auth/account/token */
export async function authAccountControllerToken(options?: { [key: string]: any }) {
  return request<any>("/api/auth/account/token", {
    method: "GET",
    ...(options || {}),
  });
}
