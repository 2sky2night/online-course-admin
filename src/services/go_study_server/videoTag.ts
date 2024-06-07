// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 创建标签 后台账户创建标签 POST /api/video/tag */
export async function videoTagControllerAddTag(
  body: API.CreateTagDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>("/api/video/tag", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取标签的详情信息 获取标签的详情信息 GET /api/video/tag/${param0} */
export async function videoTagControllerInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoTagControllerInfoParams,
  options?: { [key: string]: any },
) {
  const { tid: param0, ...queryParams } = params;
  return request<API.ResponseDto & { data?: API.TagInfoDto }>(`/api/video/tag/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新标签 后台账户更新标签 PATCH /api/video/tag/${param0} */
export async function videoTagControllerUpdateTag(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoTagControllerUpdateTagParams,
  body: API.UpdateTagDto,
  options?: { [key: string]: any },
) {
  const { tid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/tag/${param0}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询某个课程下的视频合集 分页查询某个课程下的所有视频合集 GET /api/video/tag/${param0}/collection */
export async function videoTagControllerCollectionList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoTagControllerCollectionListParams,
  options?: { [key: string]: any },
) {
  const { tid: param0, ...queryParams } = params;
  return request<
    API.ResponseDto & { data?: { list?: API.CollectionDtoA[]; total?: number; has_more?: boolean } }
  >(`/api/video/tag/${param0}/collection`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 查询某个课程下的视频 分页查询某个课程下的所有视频 GET /api/video/tag/${param0}/videos */
export async function videoTagControllerVideoList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoTagControllerVideoListParams,
  options?: { [key: string]: any },
) {
  const { tid: param0, ...queryParams } = params;
  return request<
    API.ResponseDto & {
      data?: { list?: API.RVideoListItemDto[]; total?: number; has_more?: boolean };
    }
  >(`/api/video/tag/${param0}/videos`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 分页获取标签 分页获取所有标签 GET /api/video/tag/list */
export async function videoTagControllerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoTagControllerListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & { data?: { list?: API.TagInfoDto[]; total?: number; has_more?: boolean } }
  >("/api/video/tag/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
