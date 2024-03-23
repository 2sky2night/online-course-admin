// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建视频收藏夹 前台用户创建视频收藏夹 POST /api/video/favorite */
export async function videoFavoriteControllerCreateFavorite(
  body: API.CreateFavoriteDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>('/api/video/favorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新收藏夹信息 前台用户更新收藏夹信息 PATCH /api/video/favorite/${param0} */
export async function videoFavoriteControllerUpdateFavorite(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoFavoriteControllerUpdateFavoriteParams,
  body: API.UpdateFavoriteDto,
  options?: { [key: string]: any },
) {
  const { fid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/favorite/${param0}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询收藏夹中的视频 查询收藏夹中的视频 GET /api/video/favorite/${param0}/videos */
export async function videoFavoriteControllerFavoriteVideoList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoFavoriteControllerFavoriteVideoListParams,
  options?: { [key: string]: any },
) {
  const { fid: param0, ...queryParams } = params;
  return request<
    API.ResponseDto & { data?: { list?: API.VideoDto[]; total?: number; has_more?: boolean } }
  >(`/api/video/favorite/${param0}/videos`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 从收藏夹中移除一些视频 前台用户从收藏夹中移除一些视频 DELETE /api/video/favorite/${param0}/videos */
export async function videoFavoriteControllerRemoveVideos(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoFavoriteControllerRemoveVideosParams,
  body: API.RemoveVideosDto,
  options?: { [key: string]: any },
) {
  const { fid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/favorite/${param0}/videos`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询用户默认收藏夹中视频 分页查询用户默认收藏夹中的所有视频 GET /api/video/favorite/default/videos */
export async function videoFavoriteControllerFavoriteDefaultVideoList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoFavoriteControllerFavoriteDefaultVideoListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & { data?: { list?: API.VideoDto[]; total?: number; has_more?: boolean } }
  >('/api/video/favorite/default/videos', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 从默认收藏夹中移除多个视频 前台用户从默认收藏夹中移除多个视频 DELETE /api/video/favorite/default/videos */
export async function videoFavoriteControllerRemoveDefaultVideos(
  body: API.RemoveVideosDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>('/api/video/favorite/default/videos', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询用户收藏夹列表 分页查询前台用户收藏夹列表 GET /api/video/favorite/user/list */
export async function videoFavoriteControllerUserFavoritesList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoFavoriteControllerUserFavoritesListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & { data?: { list?: API.FavoriteDto[]; total?: number; has_more?: boolean } }
  >('/api/video/favorite/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询用户收藏夹对此视频的收藏状态 分页查询用户收藏夹对此视频的收藏状态 GET /api/video/favorite/user/list/with-video */
export async function videoFavoriteControllerUserFavoritesWithVideo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoFavoriteControllerUserFavoritesWithVideoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.FavoriteListDto }>(
    '/api/video/favorite/user/list/with-video',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 更新收藏夹信息 前台用户更新收藏夹信息 POST /api/video/favorite/videos */
export async function videoFavoriteControllerAddVideos(
  body: API.AddVideoDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>('/api/video/favorite/videos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
