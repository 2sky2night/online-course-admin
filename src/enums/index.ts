export enum Roles {
  /**
   * 管理员
   */
  ADMIN = "Admin",
  /**
   * 超级管理员
   */
  SUPER_ADMIN = "SuperAdmin",
  /**
   * 老师
   */
  TEACHER = "Teacher",
}

/**
 * 文件上传的限制
 */
export enum FileSize {
  /**
   * 头像上传的最大为2mb(byte)
   */
  FILE_AVATAR_SIZE = 2097152,
  /**
   * 封面上传的最大为2mb（byte）
   */
  FILE_COVER_SIZE = 2097152,
  /**
   * 文件切片大小最大为10mb(byte)
   */
  FILE_CHUNK_SIZE = 10485760,
  /**
   *配图的大小最大为10mb(byte)
   */
  FILE_IMAGE_SIZE = 10485760,
}
