export interface Props<T> {
  /**
   * 请求函数，会在刷新、初始化、页码、页长度更新时执行
   * @param pageSize 页长度
   * @param page 页码
   * @returns
   */
  request: (pageSize: number, page: number) => Promise<{ data: { list: T; total: number } }>;
}
