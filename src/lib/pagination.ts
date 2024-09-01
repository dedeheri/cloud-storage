const pagination = (data: any, startIndex: any, endIndex: any, page: any) => {
  const totalPages = Math.ceil(data.length / 12);
  const pagination: any = { totalPages };

  if (endIndex < data.length) {
    pagination.next = {
      page: parseInt(page) + 1,
      limit: 12,
    };
  }

  if (startIndex > 0) {
    pagination.previous = {
      page: parseInt(page) - 1,
      limit: 12,
    };
  }

  return pagination;
};

export default pagination;
