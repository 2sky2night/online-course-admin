export type TagListResponse = API.ResponseDto & {
  data: {
    list: API.TagInfoDto[];
    total: number;
    has_more: boolean;
  };
};
