// @ts-ignore
/* eslint-disable */
import { request } from "@umijs/max";

/** 获取分区列表 获取分区列表 GET /api/video/partition */
export async function videoPartitionControllerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoPartitionControllerListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseDto & {
      data?: { list?: API.PartitionInfoDto[]; total?: number; has_more?: boolean };
    }
  >("/api/video/partition", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建分区 后台账户创建分区 POST /api/video/partition */
export async function videoPartitionControllerAddPartition(
  body: API.CreatePartitionDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseEmptyDto>("/api/video/partition", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取分区详情 获取分区详情 GET /api/video/partition/${param0} */
export async function videoPartitionControllerInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoPartitionControllerInfoParams,
  options?: { [key: string]: any },
) {
  const { pid: param0, ...queryParams } = params;
  return request<API.ResponseDto & { data?: API.PartitionInfoDto }>(
    `/api/video/partition/${param0}`,
    {
      method: "GET",
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 删除分区 软删除分区 DELETE /api/video/partition/${param0} */
export async function videoPartitionControllerDeletePartition(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoPartitionControllerDeletePartitionParams,
  options?: { [key: string]: any },
) {
  const { pid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/partition/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改分区信息 后台账户修改分区信息 PATCH /api/video/partition/${param0} */
export async function videoPartitionControllerUpdatePartition(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.VideoPartitionControllerUpdatePartitionParams,
  body: API.UpdatePartitionDto,
  options?: { [key: string]: any },
) {
  const { pid: param0, ...queryParams } = params;
  return request<API.ResponseEmptyDto>(`/api/video/partition/${param0}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
