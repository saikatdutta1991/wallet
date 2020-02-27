const _ = require("lodash");

/**
 * Chunks query data
 *
 * This method helps to fetch large amount of data in chunks
 *
 * @author Saikat Dutta <saikatdutta1991@gmail.com>
 *
 * @param {QueryBuilder} queryBuilder       KnexJs query builder object
 * @param {number} chunkSize                Size of each chunk data
 * @param {Function|AsyncFunction} handler  callback after each chunk is fetched
 *
 * @return {Promise<boolean>}
 */
exports.chunk = async (queryBuilder, chunkSize, handler) => {
  const recordCount = await getCount(queryBuilder);
  let skip = 0;

  while (skip < recordCount) {
    const data = await queryBuilder.limit(chunkSize).offset(skip);
    await handler(data);
    skip += chunkSize;
  }

  return true;
};

/**
 * Get number of records
 *
 * It clones the queryBuilder object and fetch records count,
 * So that queryBuilder objection does not get modified
 *
 * @author Saikat Dutta <saikatdutta1991@gmail.com>
 *
 * @param {QueryBuilder} queryBuilder KnexJs query builder object
 *
 * @returns {number}
 */
const getCount = async queryBuilder => {
  const clonedQueryBuilder = _.cloneDeep(queryBuilder);
  const record = await clonedQueryBuilder.count("*", { as: "count" });
  return _.head(record).count;
};
