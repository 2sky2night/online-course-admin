/**
 * 申请注册记录
 */
export type ApplyListResponse = Required<
  API.ResponseDto & {
    data: {
      list: API.ApplyRegisterInfoDto[];
      total: number;
      has_more: boolean;
    };
  }
>;
