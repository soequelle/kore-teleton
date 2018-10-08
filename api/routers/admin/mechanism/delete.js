const Route = require('lib/router/route')

const { Mechanism } = require('models')

module.exports = new Route({
  method: 'delete',
  path: '/:uuid',
  handler: async function (ctx) {
    var mechanismId = ctx.params.uuid

    var mechanism = await Mechanism.findOne({'uuid': mechanismId})
    ctx.assert(mechanism, 404, 'Mechanism not found')

    mechanism.set({
      isDeleted: true
    })

    await mechanism.save()

    ctx.body = {
      data: mechanism
    }
  }
})
