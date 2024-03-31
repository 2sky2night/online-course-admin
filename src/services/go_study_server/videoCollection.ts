// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 创建一个视频合集 老师创建一个视频合集 POST /api/video/collection */
export async function videoCollectionControllerPublishCollection(
  body: API.CreateVideoCollectionDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>("/api/video/collection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新视频合集的信息 老师更新视频合集的信息 PATCH /api/video/collection/${param0} */
export async function videoCollectionControllerUpdateInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCollectionControllerUpdateInfoParams,
  body: API.UpdateVideoCollectionDto,
  options?: { [key: string]: any },
) {
  const { cid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/collection/${param0}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 更新合集的分区 老师更新合集的分区 PATCH /api/video/collection/${param0}/partition */
export async function videoCollectionControllerUpdatePartition(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCollectionControllerUpdatePartitionParams,
  body: API.UpdateCollectionPartitionDto,
  options?: { [key: string]: any },
) {
  const { cid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/collection/${param0}/partition`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 订阅合集 前台用户订阅合集 POST /api/video/collection/${param0}/subscribe */
export async function collectionSubscribeControllerSubscribe(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CollectionSubscribeControllerSubscribeParams,
  options?: { [key: string]: any },
) {
  const { cid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/collection/${param0}/subscribe`, {
    method: "POST",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消订阅合集 前台用户取消订阅合集 DELETE /api/video/collection/${param0}/subscribe */
export async function collectionSubscribeControllerUnsubscribe(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CollectionSubscribeControllerUnsubscribeParams,
  options?: { [key: string]: any },
) {
  const { cid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/collection/${param0}/subscribe`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 给合集添加标签 老师给合集添加标签 POST /api/video/collection/${param0}/tags */
export async function videoCollectionControllerAddTags(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCollectionControllerAddTagsParams,
  body: API.AddTagsDto,
  options?: { [key: string]: any },
) {
  const { cid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/collection/${param0}/tags`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 移除合集的标签 老师移除合集的标签 DELETE /api/video/collection/${param0}/tags */
export async function videoCollectionControllerRemoveTags(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCollectionControllerRemoveTagsParams,
  body: API.RemoveTagsDto,
  options?: { [key: string]: any },
) {
  const { cid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/collection/${param0}/tags`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取此合集下的视频列表 获取此合集下的视频列表 GET /api/video/collection/${param0}/videos */
export async function videoCollectionControllerVideoList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCollectionControllerVideoListParams,
  options?: { [key: string]: any },
) {
  const { cid: param0, ...queryParams } = params;
  return request<
    API.ResponseDto & {
      data?: { list?: API.RVideoListItemDto[]; total?: number; has_more?: boolean };
    }
  >(`/api/video/collection/${param0}/videos`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 在合集中添加视频 老师在视频合集中添加视频 POST /api/video/collection/${param0}/videos */
export async function videoCollectionControllerAddVideos(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCollectionControllerAddVideosParams,
  body: API.AddVideosDto,
  options?: { [key: string]: any },
) {
  const { cid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/collection/${param0}/videos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 在合集中移除视频 老师在视频合集中移除视频 DELETE /api/video/collection/${param0}/videos */
export async function videoCollectionControllerRemoveVideos(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCollectionControllerRemoveVideosParams,
  body: API.DeleteVideosDto,
  options?: { [key: string]: any },
) {
  const { cid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/collection/${param0}/videos`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 获取合集信息 获取合集信息 GET /api/video/collection/info/${param0} */
export async function videoCollectionControllerInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCollectionControllerInfoParams,
  options?: { [key: string]: any },
) {
  const { cid: param0, ...queryParams } = params;
  return request<API.ResponseDto & { data?: API.CollectionDtoA }>(
    `/api/video/collection/info/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 查询合集列表 分页查询所有视频合集列表 GET /api/video/collection/list */
export async function videoCollectionControllerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCollectionControllerListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & { data?: { list?: API.CollectionDtoA[]; total?: number; has_more?: boolean } }
  >("/api/video/collection/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询此分区下的合集列表 分页查询此分区下的视频合集列表 GET /api/video/collection/list/partition/${param0} */
export async function videoCollectionControllerPartitionList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoCollectionControllerPartitionListParams,
  options?: { [key: string]: any },
) {
  const { pid: param0, ...queryParams } = params;
  return request<
    API.ResponseDto & { data?: { list?: API.CollectionDto[]; total?: number; has_more?: boolean } }
  >(`/api/video/collection/list/partition/${param0}`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 查看用户订阅的视频合集 查看用户订阅的视频合集 GET /api/video/collection/user/subscribes */
export async function collectionSubscribeControllerSubscribeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CollectionSubscribeControllerSubscribeListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & { data?: { list?: API.CollectionDtoA[]; total?: number; has_more?: boolean } }
  >("/api/video/collection/user/subscribes", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
