const Route = require('lib/router/route')

const { Mechanism } = require('models')

module.exports = new Route({
  method: 'get',
  path: '/:uuid',
  handler: async function (ctx) {
    var mechanismId = ctx.params.uuid

    const mechanism = await Mechanism.findOne({'uuid': mechanismId, 'isDeleted': false})
    ctx.assert(mechanism, 404, 'Mechanism not found')

    ctx.body = {
      data: mechanism.toAdmin()
    }
  }
})
