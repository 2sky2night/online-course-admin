// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 老师发布视频 老师发布视频 POST /api/video */
export async function videoControllerPublishVideo(
  body: API.PublishVideoDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>("/api/video", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除视频 软删除视频 DELETE /api/video/${param0} */
export async function videoControllerDeleteVideo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerDeleteVideoParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新视频信息 老师更新视频的信息 PATCH /api/video/${param0} */
export async function videoControllerUpdateInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerUpdateInfoParams,
  body: API.UpdateVideoDto,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/${param0}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 增加视频浏览历史记录 前台用户增加视频浏览历史记录,并记录用户观看的时长 POST /api/video/${param0}/history */
export async function videoControllerAddHistory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerAddHistoryParams,
  body: API.AddVideoHistoryDto,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/${param0}/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除视频观看记录 前台用户删除视频观看记录 DELETE /api/video/${param0}/history */
export async function videoControllerRemoveHistory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerRemoveHistoryParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/${param0}/history`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 点赞视频 前台用户给视频点赞 POST /api/video/${param0}/like */
export async function videoControllerAddLike(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerAddLikeParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/${param0}/like`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消点赞视频 前台用户取消点赞点赞 DELETE /api/video/${param0}/like */
export async function videoControllerRemoveLike(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerRemoveLikeParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/${param0}/like`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改视频课程 老师修改视频课程 PATCH /api/video/${param0}/partition */
export async function videoControllerUpdateVideoPartition(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerUpdateVideoPartitionParams,
  body: API.UpdateVideoPartitionDto,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/${param0}/partition`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询当前用户对视频的态度(点赞、收藏状态) 查询当前用户对视频的态度(点赞、收藏状态) GET /api/video/${param0}/status */
export async function videoControllerGetVideoStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerGetVideoStatusParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseDto & { data?: API.RGetVideoStatus }>(`/api/video/${param0}/status`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 给视频添加标签 老师给视频添加标签 POST /api/video/${param0}/tags */
export async function videoControllerAddVideoTags(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerAddVideoTagsParams,
  body: API.AddVideoTagsDto,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/${param0}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除视频的一些标签 老师给视频移除一些标签 DELETE /api/video/${param0}/tags */
export async function videoControllerRemoveVideoTags(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerRemoveVideoTagsParams,
  body: API.RemoveVideoTagsDto,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/${param0}/tags`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取视频浏览量 获取视频浏览量 GET /api/video/${param0}/views */
export async function videoControllerViewsCount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerViewsCountParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseDto & { data?: API.RVideoViewsCount }>(`/api/video/${param0}/views`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 增加视频浏览量 增加视频浏览量 POST /api/video/${param0}/views */
export async function videoControllerAddViews(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerAddViewsParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/${param0}/views`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询视频观看实时人数 查询视频观看实时人数 GET /api/video/${param0}/watch */
export async function videoControllerVideoWatchCount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerVideoWatchCountParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseDto & { data?: API.RVideoWatchCount }>(`/api/video/${param0}/watch`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 增加视频实时观看人数 前台用户增加视频实时观看人数 POST /api/video/${param0}/watch */
export async function videoControllerWatchVideo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerWatchVideoParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/${param0}/watch`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 移除视频实时观看人数 前台用户移除视频实时观看人数 DELETE /api/video/${param0}/watch */
export async function videoControllerDecWatchVideo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerDecWatchVideoParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/${param0}/watch`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询视频的详情信息 查询视频的详情信息 GET /api/video/info/${param0} */
export async function videoControllerInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerInfoParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseDto & { data?: API.RVideoInfoDto }>(`/api/video/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页查询视频 分页查询视频 GET /api/video/list */
export async function videoControllerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & {
      data?: { list?: API.RVideoListItemDto[]; total?: number; has_more?: boolean };
    }
  >("/api/video/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询某课程下的视频 查询某课程下的视频 GET /api/video/list/partition/${param0} */
export async function videoControllerPartitionList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerPartitionListParams,
  options?: { [key: string]: any },
) {
  const { pid: param0, ...queryParams } = params;
  return request<
    API.ResponseDto & {
      data?: { list?: API.RVideoListItemDto[]; total?: number; has_more?: boolean };
    }
  >(`/api/video/list/partition/${param0}`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 查询某个老师发布的视频 查询某个老师发布的视频 GET /api/video/list/teacher */
export async function videoControllerGetTeacherVideoList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoControllerGetTeacherVideoListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & {
      data?: { list?: API.RVideoListItemDto[]; total?: number; has_more?: boolean };
    }
  >("/api/video/list/teacher", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
