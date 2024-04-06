import { VideoItem } from "@/types";

export interface Props {
  /**
   * 请求api初始化和下拉时会激活
   * @param pageSize
   * @param page
   * @returns
   */
  request: (pageSize: number, page: number) => Promise<{ list: VideoItem[]; has_more: boolean }>;
  /**
   * 页长度
   */
  pageSize?: number;
  /**
   * 选择更新的回调
   */
  onChange: (values: number[]) => void;
  /**
   * 选择的视频
   */
  values: number[];
}
