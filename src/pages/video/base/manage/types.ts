/**
 * 视频列表
 */
export type VideoListResponse = API.ResponseDto & {
  data: {
    list: API.RVideoListItemDto[];
    total: number;
    has_more: boolean;
  };
};
