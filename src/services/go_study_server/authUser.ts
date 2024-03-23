// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** alipay登录 使用alipay,oauth登录前台应用 POST /api/auth/user/login/alipay */
export async function authUserControllerAlipayLogin(
  body: API.OauthLoginDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.RLoginUserDto }>('/api/auth/user/login/alipay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 邮箱验证码登录 通过邮箱验证码登录前台应用 POST /api/auth/user/login/email */
export async function authUserControllerEmailLogin(
  body: API.EmailLoginDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.RLoginUserDto }>('/api/auth/user/login/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取邮箱登录验证码 获取邮箱验证码，登录前台应用 POST /api/auth/user/login/email/code */
export async function authUserControllerGenerateCode(
  body: API.EmailCodeDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>('/api/auth/user/login/email/code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** gitee登录 使用gitee,oauth登录前台应用 POST /api/auth/user/login/gitee */
export async function authUserControllerGiteeLogin(
  body: API.OauthLoginDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.RLoginUserDto }>('/api/auth/user/login/gitee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** github登录 使用github,oauth登录前台应用 POST /api/auth/user/login/github */
export async function authUserControllerGithubLogin(
  body: API.OauthLoginDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.RLoginUserDto }>('/api/auth/user/login/github', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/auth/user/token */
export async function authUserControllerToken(options?: { [key: string]: any }) {
  return request<any>('/api/auth/user/token', {
    method: 'GET',
    ...(options || {}),
  });
}
