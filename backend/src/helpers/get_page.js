const { PAGE_SIZE } = require('../configs/constants');

const getPage = (page, size = 8) => {
  if (page < 1) page = 1;
  page = parseInt(page - 1);
  let start = size * page;
  let limit = size;

  return {
    start,
    limit,
  };
};

module.exports = getPage;
