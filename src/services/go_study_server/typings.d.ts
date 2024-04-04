declare namespace API {
  type AccountDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 账户ID */
    account_id: number;
    /** 账户名 */
    account_name: string;
    /** 头像 */
    avatar?: string;
    /** 邮箱 */
    email: string;
  };

  type AccountInfoDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 账户ID */
    account_id: number;
    /** 账户名 */
    account_name: string;
    /** 头像 */
    avatar?: string;
    /** 邮箱 */
    email: string;
    /** 角色 */
    role: RoleDto;
  };

  type AddCommentDto = {
    /** 视频id */
    video_id: number;
    /** 评论内容 */
    content: string;
    /** 评论的配图 */
    images?: number[];
  };

  type AddTagsDto = {
    /** 视频标签id列表 */
    tag_id_list: number[];
  };

  type AddVideoDto = {
    /** 视频id */
    video_id: number;
    /** 是否将视频收藏在默认收藏夹中 */
    set_default?: boolean;
    /** 收藏夹id列表,将视频收藏到这些收藏夹中 */
    favorite_id_list?: number[];
  };

  type AddVideoHistoryDto = {
    /** 观看的时长 */
    viewing_time: number;
  };

  type AddVideosDto = {
    /** 视频id列表 */
    video_id_list: number[];
  };

  type AddVideoTagsDto = {
    /** 视频标签列表 */
    tag_id_list: number[];
  };

  type ApplyAccountDto = {
    /** 账户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 绑定的邮箱 */
    email: string;
    /** 申请注册的原因 */
    description: string;
    /** 申请注册的角色 */
    role_name: "Teacher" | "Admin";
  };

  type ApplyRegisterDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 申请注册的id */
    apply_id: number;
    /** 申请注册的用户名称 */
    account_name: string;
    /** 申请注册的原因 */
    description: string;
    /** 申请注册时的邮箱 */
    email: string;
    /** 申请注册的角色 */
    role: RoleDto;
  };

  type ApplyRegisterInfoDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 申请注册的id */
    apply_id: number;
    /** 申请注册的用户名称 */
    account_name: string;
    /** 申请注册的原因 */
    description: string;
    /** 申请注册时的邮箱 */
    email: string;
    /** 申请注册的角色 */
    role: RoleDto;
    /** 审批的结果 */
    approval: ApprovalLogDto;
  };

  type ApprovalAccountDto = {
    /** 申请注册的id */
    apply_id: number;
    /** 审批的结果 */
    status: boolean;
  };

  type ApprovalLogDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 审批id */
    trace_id: number;
    /** 审批状态 */
    status: boolean;
  };

  type ApprovalLogInfoDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 审批id */
    trace_id: number;
    /** 审批状态 */
    status: boolean;
    /** 申请记录 */
    apply: ApplyRegisterDto;
    /** 审批的操作人 */
    approval_account: ApplyRegisterDto;
  };

  type AuthAccountControllerGetApplyListParams = {
    offset: number;
    limit: number;
    desc: boolean;
  };

  type AuthAccountControllerGetApprovalListParams = {
    offset: number;
    limit: number;
    desc: boolean;
  };

  type ChunkProgressDto = {
    /** 文件hash */
    file_hash: string;
  };

  type CollectionDtoA = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 集合ID */
    collection_id: number;
    /** 集合名称 */
    collection_name: string;
    /** 描述 */
    description: string;
    /** 集合封面 */
    collection_cover: string;
    /** 创建者 */
    creator: AccountDto;
  };

  type CollectionSubscribeControllerSubscribeListParams = {
    user_id: number;
    offset: number;
    limit: number;
    desc: boolean;
  };

  type CollectionSubscribeControllerSubscribeParams = {
    cid: number;
  };

  type CollectionSubscribeControllerUnsubscribeParams = {
    cid: number;
  };

  type CommentDtoA = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 评论ID */
    comment_id: number;
    /** 评论内容 */
    content: string;
    /** 评论图片 */
    images: string[];
    /** 评论创建者 */
    user: UserDto;
  };

  type CreateDanmuDto = {
    /** 弹幕内容 */
    content: string;
    /** 弹幕时间 */
    time: number;
  };

  type CreateFavoriteDto = {
    /** 收藏夹名称 */
    favorite_name: string;
    /** 收藏夹描述 */
    description?: string;
  };

  type CreatePartitionDto = {
    /** 分区名称 */
    partition_name: string;
  };

  type CreateReplyDto = {
    /** 回复的评论id */
    comment_id: number;
    /** 回复的内容 */
    content: string;
    /** 回复的配图 */
    images?: string[];
    /** 引用的回复id */
    ref_id?: number;
  };

  type CreateTagDto = {
    /** 标签名称 */
    tag_name: string;
  };

  type CreateVideoCollectionDto = {
    /** 合集名称 */
    collection_name: string;
    /** 合集描述 */
    description?: string;
    /** 将哪些视频添加到合集中？ */
    video_id_list?: number[];
    /** 视频合集封面 */
    collection_cover?: string;
    /** 视频分区id，将此合集放在那个分区中? */
    partition_id?: number;
    /** 视频合集的标签？ */
    tag_id_list?: number[];
  };

  type DanmuDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 弹幕ID */
    danmu_id: number;
    /** 弹幕内容 */
    content: string;
    /** 弹幕时间 */
    time: number;
  };

  type DanmuDtoA = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 弹幕ID */
    danmu_id: number;
    /** 弹幕内容 */
    content: string;
    /** 弹幕时间 */
    time: number;
    /** 发布弹幕的创建者 */
    user: UserDto;
  };

  type DeleteVideosDto = {
    /** 视频id列表 */
    video_id_list: number[];
  };

  type EmailCodeDto = {
    /** 要获取邮箱登录验证码的邮箱地址 */
    email: string;
  };

  type EmailLoginDto = {
    /** 要登录的邮箱 */
    email: string;
    /** 邮箱验证码 */
    code: string;
  };

  type FastUploadDto = {
    /** 文件hash */
    file_hash: string;
  };

  type FavoriteDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 收藏ID */
    favorite_id: number;
    /** 收藏名称 */
    favorite_name: string;
    /** 收藏描述 */
    description: string;
  };

  type FavoriteItemDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 收藏ID */
    favorite_id: number;
    /** 收藏名称 */
    favorite_name: string;
    /** 收藏描述 */
    description: string;
    /** 收藏状态 */
    favorite_state: boolean;
  };

  type FavoriteListDto = {
    /** 收藏夹列表 */
    list: FavoriteItemDto[];
    /** 默认状态 */
    default_state: boolean;
    /** 总数 */
    total: number;
    /** 是否有更多 */
    has_more: boolean;
  };

  type FileUploadAvatarDto = {
    /** 文件内容 */
    avatar: string;
  };

  type FileUploadChunkDto = {
    /** 整个文件的hash值 */
    file_hash: string;
    /** 切片的hash（切片索引） */
    chunk_hash: string;
    /** 切片内容 */
    chunk: string;
  };

  type FileUploadCommentDto = {
    /** 文件内容 */
    image: string;
  };

  type FileUploadCoverDto = {
    /** 文件内容 */
    cover: string;
  };

  type FileUploadVideoDto = {
    /** 文件内容 */
    video: string;
  };

  type LoginAccountDto = {
    /** 账户名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type MergeChunkDto = {
    /** 文件的hash */
    file_hash: string;
    /** 切片数量 */
    chunk_count: number;
  };

  type OauthLoginDto = {
    /** 授权码 */
    code: string;
  };

  type PartitionDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 分区ID */
    partition_id: number;
    /** 分区名称 */
    partition_name: string;
  };

  type PartitionInfoDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 分区ID */
    partition_id: number;
    /** 分区名称 */
    partition_name: string;
    /** 发布者信息 */
    account: AccountDto;
  };

  type PublishVideoDto = {
    /** 视频名称 */
    video_name: string;
    /** 视频的描述 */
    description?: string;
    /** 视频对应的文件id */
    file_id: number;
    /** 要将此视频添加到哪些合集中去 */
    collection_id_list?: number[];
    /** 视频的封面 */
    video_cover?: string;
    /** 视频的分区 */
    partition_id?: number;
    /** 视频的标签 */
    tag_id_list?: number[];
  };

  type RApplyAccountDto = {
    /** 账户名 */
    username: string;
    /** 绑定的邮箱 */
    email: string;
    /** 申请注册原因 */
    description: string;
    /** 申请的角色 */
    role_name: "Teacher" | "Admin";
  };

  type RChunkUploadProgress = {
    /** 业务状态码 */
    code: number;
    /** 调用情况描述 */
    msg: string;
    /** 已经上传的切片索引 */
    data: number[];
  };

  type REmailAccountDto = {
    /** 令牌 */
    access_token: string;
  };

  type RemoveTagsDto = {
    /** 视频标签id列表 */
    tag_id_list: number[];
  };

  type RemoveVideosDto = {
    /** 视频id列表 */
    video_id_list: number[];
  };

  type RemoveVideoTagsDto = {
    /** 标签id列表 */
    tag_id_list: number[];
  };

  type ReplyDtoA = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 回复ID */
    reply_id: number;
    /** 回复内容 */
    content: string;
    /** 回复图片 */
    images: string[];
    /** 引用的回复id,null为回复的评论，其他为回复的回复 */
    ref_id: number;
    /** 回复的创建者 */
    user: UserDto;
  };

  type ResponseDto = {
    /** 业务状态码 */
    code: number;
    /** 调用情况描述 */
    msg: string;
  };

  type ResponseEmptyDto = {
    /** 业务状态码 */
    code: number;
    /** 调用情况描述 */
    msg: string;
    /** 响应的实际数据 */
    data: any;
  };

  type RFastUploadDto = {
    /** 文件是否存在 */
    done: boolean;
    /** 提示信息 */
    tips?: string;
    /** 上传记录id */
    trace_id?: number;
    /** 文件id */
    file_id?: number;
    /** 资源路径 */
    url?: string;
  };

  type RGetVideoMergeProgress = {
    /** 提示信息 */
    tips?: string;
    /** 上传记录id */
    trace_id?: number;
    /** 文件id */
    file_id?: number;
    /** 资源路径 */
    url?: string;
  };

  type RGetVideoProcessingProgress = {
    /** 是否处理完成？ */
    done: boolean;
    /** 提示信息 */
    tips?: string;
  };

  type RLoginAccountDto = {
    /** 令牌 */
    access_token: string;
  };

  type RLoginUserDto = {
    /** 令牌 */
    access_token: string;
  };

  type RMergeChunk = {
    /** 任务id，可以该id来查询任务执行的情况 */
    merge_key: string;
  };

  type RoleDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 角色id */
    role_id: number;
    /** 角色名称 */
    role_name: "SuperAdmin" | "Admin" | "Teacher";
  };

  type RToDoVideoProcessing = {
    /** 处理进度的id */
    processing_key: string;
  };

  type RUploadImgDto = {
    /** 上传记录id */
    trace_id: number;
    /** 文件id */
    file_id: number;
    /** 资源路径 */
    url: string;
  };

  type RUploadVideoDto = {
    /** 上传记录id */
    trace_id: number;
    /** 文件id */
    file_id: number;
    /** 资源路径 */
    url: string;
  };

  type RVideoInfoDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 视频id */
    video_id: number;
    /** 视频名称 */
    video_name: string;
    /** 视频封面 */
    video_cover: string;
    /** 视频描述 */
    description: string;
    /** 视频时长，秒为单位 */
    duration: number;
    /** 发布者信息 */
    publisher: AccountDto;
    /** 分区信息 */
    partition: PartitionDto;
    /** 视频源信息 */
    source: SourceDto[];
    /** 视频标签信息 */
    tags: TagDto[];
    /** 视频动态信息 */
    count: VideoDataCountDto;
  };

  type RVideoListItemDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 视频id */
    video_id: number;
    /** 视频名称 */
    video_name: string;
    /** 视频封面 */
    video_cover: string;
    /** 视频描述 */
    description: string;
    /** 视频时长，秒为单位 */
    duration: number;
    /** 发布者信息 */
    publisher: AccountDto;
  };

  type RVideoViewsCount = {
    /** 视频浏览量 */
    count: number;
  };

  type RVideoWatchCount = {
    /** 视频实时观看数量 */
    count: number;
  };

  type SourceDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** M3U8 ID */
    m3u8_id: number;
    /** 文件路径 */
    file_path: string;
    /** 分辨率 */
    resolution: number;
  };

  type TagDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 标签ID */
    tag_id: number;
    /** 标签名称 */
    tag_name: string;
  };

  type TagInfoDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 标签ID */
    tag_id: number;
    /** 标签名称 */
    tag_name: string;
    /** 发布者信息 */
    account: AccountDto;
  };

  type UpdateAccountPasswordDto = {
    /** 新密码 */
    password: string;
    /** 旧密码 */
    old_password: string;
  };

  type UpdateAccountProfileDto = {
    /** 账户名称 */
    account_name?: string;
    /** 账户的头像 */
    avatar?: string;
  };

  type UpdateCollectionPartitionDto = {
    /** 分区id */
    partition_id: number;
  };

  type UpdateFavoriteDto = {
    /** 收藏夹名称 */
    favorite_name?: string;
    /** 收藏夹描述 */
    description?: string;
  };

  type UpdatePartitionDto = {
    /** 分区名称 */
    partition_name: string;
  };

  type UpdateTagDto = {
    /** 标签名称 */
    tag_name: string;
  };

  type UpdateUserProfileDto = {
    /** 账户名称 */
    user_name?: string;
    /** 头像 */
    avatar?: string;
    /** 年龄 */
    age?: number;
    /** 性别 */
    gender?: boolean;
  };

  type UpdateVideoCollectionDto = {
    /** 合集名称 */
    collection_name?: string;
    /** 合集描述 */
    description?: string;
    /** 视频合集封面 */
    collection_cover?: string;
  };

  type UpdateVideoDto = {
    /** 视频的名称 */
    video_name?: string;
    /** 视频的描述 */
    description?: string;
    /** 视频的封面 */
    video_cover?: string;
  };

  type UpdateVideoPartitionDto = {
    /** 分区的id */
    partition_id: number;
  };

  type UploadVideoControllerGetVideoMergeProgressParams = {
    merge_key: string;
  };

  type UploadVideoControllerGetVideoProcessingProgressParams = {
    processing_key: string;
  };

  type UploadVideoControllerToDoVideoProcessingParams = {
    fid: number;
  };

  type UserDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 用户id */
    user_id: number;
    /** 对应平台的用户id */
    platform_id: string;
    /** 用户名称 */
    user_name: string;
    /** 用户头像 */
    avatar: string;
    /** 用户性别 */
    gender: boolean;
    /** 用户年龄 */
    age: number;
  };

  type VideoCollectionControllerAddTagsParams = {
    cid: number;
  };

  type VideoCollectionControllerAddVideosParams = {
    cid: number;
  };

  type VideoCollectionControllerInfoParams = {
    cid: number;
  };

  type VideoCollectionControllerListParams = {
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoCollectionControllerPartitionListParams = {
    pid: number;
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoCollectionControllerRemoveTagsParams = {
    cid: number;
  };

  type VideoCollectionControllerRemoveVideosParams = {
    cid: number;
  };

  type VideoCollectionControllerUpdateInfoParams = {
    cid: number;
  };

  type VideoCollectionControllerUpdatePartitionParams = {
    cid: number;
  };

  type VideoCollectionControllerVideoListParams = {
    cid: number;
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoCommentControllerAddCommentLikeParams = {
    cid: number;
  };

  type VideoCommentControllerCommonListParams = {
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoCommentControllerListParams = {
    vid: number;
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoCommentControllerRemoveCommentLikeParams = {
    cid: number;
  };

  type VideoControllerAddHistoryParams = {
    vid: number;
  };

  type VideoControllerAddLikeParams = {
    vid: number;
  };

  type VideoControllerAddVideoTagsParams = {
    vid: number;
  };

  type VideoControllerAddViewsParams = {
    vid: number;
  };

  type VideoControllerDecWatchVideoParams = {
    vid: number;
  };

  type VideoControllerGetVideoStatusParams = {
    vid: number;
  };

  type VideoControllerInfoParams = {
    vid: number;
  };

  type VideoControllerListParams = {
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoControllerPartitionListParams = {
    pid: number;
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoControllerRemoveHistoryParams = {
    vid: number;
  };

  type VideoControllerRemoveLikeParams = {
    vid: number;
  };

  type VideoControllerRemoveVideoTagsParams = {
    vid: number;
  };

  type VideoControllerUpdateInfoParams = {
    vid: number;
  };

  type VideoControllerUpdateVideoPartitionParams = {
    vid: number;
  };

  type VideoControllerVideoWatchCountParams = {
    vid: number;
  };

  type VideoControllerViewsCountParams = {
    vid: number;
  };

  type VideoControllerWatchVideoParams = {
    vid: number;
  };

  type VideoDanmuControllerCommonListParams = {
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoDanmuControllerCreateDanmuParams = {
    vid: number;
  };

  type VideoDanmuControllerDanmuListInVideoParams = {
    vid: number;
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoDanmuControllerListParams = {
    vid: number;
    start: number;
    end: number;
  };

  type VideoDataCountDto = {
    /** 视频观看次数 */
    views: number;
    /** 视频点赞数 */
    likes: number;
    /** 视频收藏数 */
    stars: number;
  };

  type VideoDto = {
    /** 创建时间 */
    created_time: string;
    /** 更新时间 */
    updated_time: string;
    /** 删除时间 */
    deleted_time: string;
    /** 视频id */
    video_id: number;
    /** 视频名称 */
    video_name: string;
    /** 视频封面 */
    video_cover: string;
    /** 视频描述 */
    description: string;
    /** 视频时长，秒为单位 */
    duration: number;
  };

  type VideoFavoriteControllerFavoriteDefaultVideoListParams = {
    user_id: number;
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoFavoriteControllerFavoriteVideoListParams = {
    fid: number;
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoFavoriteControllerRemoveVideosParams = {
    fid: number;
  };

  type VideoFavoriteControllerUpdateFavoriteParams = {
    fid: number;
  };

  type VideoFavoriteControllerUserFavoritesListParams = {
    user_id: number;
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoFavoriteControllerUserFavoritesWithVideoParams = {
    offset: number;
    limit: number;
    desc: boolean;
    video_id: number;
  };

  type VideoPartitionControllerInfoParams = {
    pid: number;
  };

  type VideoPartitionControllerListParams = {
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoPartitionControllerUpdatePartitionParams = {
    pid: number;
  };

  type VideoReplyControllerAddReplyLikeParams = {
    rid: number;
  };

  type VideoReplyControllerCommonListParams = {
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoReplyControllerListParams = {
    cid: number;
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoReplyControllerRemoveReplyLikeParams = {
    rid: number;
  };

  type VideoReplyControllerReplyListInVideoParams = {
    vid: number;
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoTagControllerCollectionListParams = {
    tid: number;
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoTagControllerInfoParams = {
    tid: number;
  };

  type VideoTagControllerListParams = {
    offset: number;
    limit: number;
    desc: boolean;
  };

  type VideoTagControllerUpdateTagParams = {
    tid: number;
  };

  type VideoTagControllerVideoListParams = {
    tid: number;
    offset: number;
    limit: number;
    desc: boolean;
  };
}
