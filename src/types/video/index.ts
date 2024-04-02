/**
 * 视频列表项
 */
export type VideoItem = API.RVideoListItemDto;

/**
 * 视频详情信息
 */
export type VideoInfo = API.RVideoInfoDto;

/**
 * 视频播放源
 */
export type VideoSource = API.SourceDto;

/**
 * 视频合集信息（包含了创建人）
 */
export type VideoCollection = API.CollectionDtoA;

/**
 * 视频合集详情信息
 */
export type VideoCollectionInfo = VideoCollection;

/**
 * 视频分区列表项
 */
export type VideoPartitionItem = API.PartitionInfoDto;

/**
 * 视频分区详情信息
 */
export type VideoPartitionInfo = VideoPartitionItem;

/**
 * 视频列表的响应信息
 */
export type VideoListRepsonse = API.ResponseDto & {
  data: {
    list: API.RVideoListItemDto[];
    total: number;
    has_more: boolean;
  };
};

/**
 * 视频合集列表的响应信息
 */
export type VideoCollectionResposne = API.ResponseDto & {
  data: {
    list: API.CollectionDtoA[];
    total: number;
    has_more: boolean;
  };
};
