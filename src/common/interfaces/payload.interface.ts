export interface PaginatedResponse<T> {
    data: T[];
    metaData: {
      totalItems: number;
      totalPages: number;
      nextPage: number;
      pageNumber: number;
      pageSize: number;
    };
}