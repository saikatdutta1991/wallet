const { QueryBuilder } = require("objection");
const { chunk } = require("../helpers/queryChunk");

/**
 * Example :
 *
 * const chunkSize = 10;
 * MyModel.query().chunk(chunkSize, function(chunk) {
 *  console.log('array of records', chunk);
 * });
 */

class ChunkQueryBuilder extends QueryBuilder {
  async chunk(chunkSize, handler) {
    await chunk(this, chunkSize, handler);
    return this;
  }
}

module.exports = ChunkQueryBuilder;
