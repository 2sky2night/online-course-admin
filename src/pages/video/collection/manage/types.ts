export type VideoCollectionListResponse = API.ResponseDto & {
  data: {
    list: API.CollectionDtoA[];
    total: number;
    has_more: boolean;
  };
};
