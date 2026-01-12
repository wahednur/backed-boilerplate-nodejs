interface IPagination {
  pagination: {
    take: number;
    skip: number;
  };
}

export const pagination = (query: IPagination, total: number) => {
  const page = Math.floor(query.pagination.skip / query.pagination.take) + 1;
  const limit = query.pagination.take;
  const totalPage = Math.ceil(total / limit);

  const pageInfo = {
    page,
    limit,
    total,
    totalPage,
  };
  return pageInfo;
};
