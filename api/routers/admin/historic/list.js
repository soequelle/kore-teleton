const Route = require('lib/router/route')
const { Historic } = require('models')
const QueryParams = require('lib/router/query-params')
const queryParams = new QueryParams()

module.exports = new Route({
  method: 'get',
  path: '/',
  handler: async function (ctx) {
    const filters = await queryParams.toFilters(ctx.request.query)

    var historics = await Historic.dataTables({
      limit: ctx.request.query.limit || 20,
      skip: ctx.request.query.start,
      find: {isDeleted: false, ...filters},
      sort: ctx.request.query.sort || '-createdAt',
      populate: 'mechanism',
      formatter: 'toAdmin'
    })

    ctx.body = historics
  }
})
