// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 查询评论的回复列表 分页查询评论的所有回复列表 GET /api/video/comment/${param0}/reply */
export async function videoReplyControllerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoReplyControllerListParams,
  options?: { [key: string]: any },
) {
  const { cid: param0, ...queryParams } = params;
  return request<
    API.ResponseDto & { data?: { list?: API.ReplyDtoA[]; total?: number; has_more?: boolean } }
  >(`/api/video/comment/${param0}/reply`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 发布回复 前台用户发布回复 POST /api/video/reply */
export async function videoReplyControllerAddReply(
  body: API.CreateReplyDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>("/api/video/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 点赞回复 前台用户点赞回复 POST /api/video/reply/${param0} */
export async function videoReplyControllerAddReplyLike(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoReplyControllerAddReplyLikeParams,
  options?: { [key: string]: any },
) {
  const { rid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/reply/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消点赞回复 前台用户取消点赞回复 DELETE /api/video/reply/${param0} */
export async function videoReplyControllerRemoveReplyLike(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoReplyControllerRemoveReplyLikeParams,
  options?: { [key: string]: any },
) {
  const { rid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/reply/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询所有回复 查询所有回复 GET /api/video/reply/list */
export async function videoReplyControllerCommonList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoReplyControllerCommonListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & { data?: { list?: API.ReplyDtoA[]; total?: number; has_more?: boolean } }
  >("/api/video/reply/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
