const Route = require('lib/router/route')

const { Historic } = require('models')

module.exports = new Route({
  method: 'get',
  path: '/:uuid',
  handler: async function (ctx) {
    var historicId = ctx.params.uuid

    const historic = await Historic.findOne({'uuid': historicId, 'isDeleted': false})
    ctx.assert(historic, 404, 'Historic not found')

    ctx.body = {
      data: historic.toAdmin()
    }
  }
})
