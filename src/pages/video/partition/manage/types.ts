export type PartitionListResponse = API.ResponseDto & {
  data: {
    list: API.PartitionInfoDto[];
    total: number;
    has_more: boolean;
  };
};
