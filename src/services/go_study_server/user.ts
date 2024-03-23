// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新用户信息 前台用户更新个人信息 PATCH /api/user/profile */
export async function userControllerUpdateProfile(
  body: API.UpdateUserProfileDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>('/api/user/profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
