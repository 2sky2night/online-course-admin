// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 后台用户上传头像 后台用户上传头像 POST /api/upload/img/avatar/account */
export async function uploadImgControllerUploadAccountAvatar(
  body: API.FileUploadAvatarDto,
  avatar?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (avatar) {
    formData.append('avatar', avatar);
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

  return request<API.ResponseDto & { data?: API.RUploadImgDto }>('/api/upload/img/avatar/account', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 前台用户上传头像 前台用户上传头像 POST /api/upload/img/avatar/user */
export async function uploadImgControllerUploadUserAvatar(
  body: API.FileUploadAvatarDto,
  avatar?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (avatar) {
    formData.append('avatar', avatar);
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

  return request<API.ResponseDto & { data?: API.RUploadImgDto }>('/api/upload/img/avatar/user', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 后台老师上传视频合集封面 后台老师上传视频合集封面 POST /api/upload/img/video/collection/cover */
export async function uploadImgControllerUploadVideoCollectionCover(
  body: API.FileUploadCoverDto,
  cover?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (cover) {
    formData.append('cover', cover);
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

  return request<API.ResponseDto & { data?: API.RUploadImgDto }>(
    '/api/upload/img/video/collection/cover',
    {
      method: 'POST',
      data: formData,
      requestType: 'form',
      ...(options || {}),
    },
  );
}

/** 前台用户上传评论配图 前台用户上传评论配图 POST /api/upload/img/video/comment */
export async function uploadImgControllerUploadVideoComment(
  body: API.FileUploadCommentDto,
  image?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (image) {
    formData.append('image', image);
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

  return request<API.ResponseDto & { data?: API.RUploadImgDto }>('/api/upload/img/video/comment', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 后台老师上传视频封面 后台老师上传视频封面 POST /api/upload/img/video/cover */
export async function uploadImgControllerUploadVideoCover(
  body: API.FileUploadCoverDto,
  cover?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (cover) {
    formData.append('cover', cover);
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

  return request<API.ResponseDto & { data?: API.RUploadImgDto }>('/api/upload/img/video/cover', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 前台用户上传回复配图 前台用户上传回复配图 POST /api/upload/img/video/reply */
export async function uploadImgControllerUploadVideoReply(
  body: API.FileUploadCommentDto,
  image?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (image) {
    formData.append('image', image);
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

  return request<API.ResponseDto & { data?: API.RUploadImgDto }>('/api/upload/img/video/reply', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
