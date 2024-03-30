/**
 * 审批注册记录
 */
export type ApprovalListResponse = Required<
  API.ResponseDto & {
    data: {
      list: API.ApprovalLogInfoDto[];
      total: number;
      has_more: boolean;
    };
  }
>;
