// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 查询某个视频下的弹幕 按照时间范围分页查询某个视频下的弹幕 GET /api/video/${param0}/danmu */
export async function videoDanmuControllerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoDanmuControllerListParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<
    API.ResponseDto & { data?: { list?: API.DanmuDto[]; total?: number; has_more?: boolean } }
  >(`/api/video/${param0}/danmu`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 发布弹幕 前台用户发布弹幕 POST /api/video/${param0}/danmu */
export async function videoDanmuControllerCreateDanmu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoDanmuControllerCreateDanmuParams,
  body: API.CreateDanmuDto,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/${param0}/danmu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询某个视频下的所有弹幕 查询某个视频下的所有弹幕 GET /api/video/${param0}/danmu/list */
export async function videoDanmuControllerDanmuListInVideo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoDanmuControllerDanmuListInVideoParams,
  options?: { [key: string]: any },
) {
  const { vid: param0, ...queryParams } = params;
  return request<
    API.ResponseDto & { data?: { list?: API.DanmuDtoA[]; total?: number; has_more?: boolean } }
  >(`/api/video/${param0}/danmu/list`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 查询所有弹幕 查询所有弹幕 GET /api/video/danmu/list */
export async function videoDanmuControllerCommonList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoDanmuControllerCommonListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & { data?: { list?: API.DanmuDtoA[]; total?: number; has_more?: boolean } }
  >("/api/video/danmu/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
