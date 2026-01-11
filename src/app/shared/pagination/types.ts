export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface QueryPagination {
  skip: number;
  take: number;
}

export interface BuildQuery<TWhere = unknown, TOrderBy = unknown> {
  where: TWhere;
  pagination: QueryPagination;
  orderBy?: TOrderBy;
}
