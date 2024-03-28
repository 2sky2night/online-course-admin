/**
 * 审批注册记录
 */
export type ListResponse = Required<
  API.ResponseDto & {
    data: {
      list: API.ApprovalLogInfoDto[];
      total: number;
      has_more: boolean;
    };
  }
>;
