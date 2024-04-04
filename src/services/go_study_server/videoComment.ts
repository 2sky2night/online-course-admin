// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 查询视频评论列表 分页查询视频评论列表 GET /api/video/${param0}/comment */
export async function videoCommentControllerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCommentControllerListParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<
    API.ResponseDto & { data?: { list?: API.CommentDtoA[]; total?: number; has_more?: boolean } }
  >(`/api/video/${param0}/comment`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 发送评论 前台用户发送视频评论 POST /api/video/comment */
export async function videoCommentControllerAddComment(
  body: API.AddCommentDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>("/api/video/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 点赞评论 前台用户点赞评论 POST /api/video/comment/${param0} */
export async function videoCommentControllerAddCommentLike(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCommentControllerAddCommentLikeParams,
  options?: { [key: string]: any },
) {
  const { cid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/comment/${param0}`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消点赞评论 前台用户取消点赞评论 DELETE /api/video/comment/${param0} */
export async function videoCommentControllerRemoveCommentLike(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCommentControllerRemoveCommentLikeParams,
  options?: { [key: string]: any },
) {
  const { cid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/comment/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询所有评论 分页查询所有评论 GET /api/video/comment/list */
export async function videoCommentControllerCommonList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCommentControllerCommonListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & { data?: { list?: API.CommentDtoA[]; total?: number; has_more?: boolean } }
  >("/api/video/comment/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
