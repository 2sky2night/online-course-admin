// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 老师直接上传视频 老师直接上传视频 POST /api/upload/video */
export async function uploadVideoControllerUploadVideo(
  body: API.FileUploadVideoDto,
  video?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (video) {
    formData.append('video', video);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.ResponseDto & { data?: API.RUploadVideoDto }>('/api/upload/video', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 老师切片上传视频文件 老师切片上传视频文件 POST /api/upload/video/chunk */
export async function uploadVideoControllerUploadChunk(
  body: API.FileUploadChunkDto,
  chunk?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (chunk) {
    formData.append('chunk', chunk);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.ResponseEmptyDto>('/api/upload/video/chunk', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 获取视频合并进度 获取视频合并的进度 GET /api/upload/video/chunk/merge */
export async function uploadVideoControllerGetVideoMergeProgress(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UploadVideoControllerGetVideoMergeProgressParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.RGetVideoMergeProgress }>(
    '/api/upload/video/chunk/merge',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 开始执行合并切片文件任务 开启执行合并切片文件的任务，通过返回的key来查询合并进度 POST /api/upload/video/chunk/merge */
export async function uploadVideoControllerMergeChunk(
  body: API.MergeChunkDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.RMergeChunk }>('/api/upload/video/chunk/merge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前文件上传了多少切片了 获取当前文件上传了多少切片了，返回已经上传成功的切片索引 返回值: 已经上传成功的切片索引 POST /api/upload/video/chunk/progress */
export async function uploadVideoControllerChunkUploadProgress(
  body: API.ChunkProgressDto,
  options?: { [key: string]: any },
) {
  return request<API.RChunkUploadProgress>('/api/upload/video/chunk/progress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 秒传 上传文件hash，检查是否上传过 POST /api/upload/video/fast */
export async function uploadVideoControllerFastUpload(
  body: API.FastUploadDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.RFastUploadDto }>('/api/upload/video/fast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取视频处理进度 获取视频处理进度 GET /api/upload/video/processing */
export async function uploadVideoControllerGetVideoProcessingProgress(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UploadVideoControllerGetVideoProcessingProgressParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseDto & { data?: API.RGetVideoProcessingProgress }>(
    '/api/upload/video/processing',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 开始执行处理视频的任务 开始执行处理视频的任务，返回处理进度的id可以轮询处理进度 POST /api/upload/video/processing/${param0} */
export async function uploadVideoControllerToDoVideoProcessing(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UploadVideoControllerToDoVideoProcessingParams,
  options?: { [key: string]: any },
) {
  const { fid: param0, ...queryParams } = params;
  return request<API.ResponseDto & { data?: API.RToDoVideoProcessing }>(
    `/api/upload/video/processing/${param0}`,
    {
      method: 'POST',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
