export type Pagination = {
  total: number;
  lastPage: number;
  perPage: number;
  currentPage: number;
  from: number;
  to: number;
};

export type PaginateQuery = {
  currentPage: number;
  perPage: number;
};

export type WithPagination<T> = {
  data: T;
  pagination: Pagination;
};
