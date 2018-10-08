const Route = require('lib/router/route')

const { Historic } = require('models')

module.exports = new Route({
  method: 'delete',
  path: '/:uuid',
  handler: async function (ctx) {
    var historicId = ctx.params.uuid

    var historic = await Historic.findOne({'uuid': historicId})
    ctx.assert(historic, 404, 'Historic not found')

    historic.set({
      isDeleted: true
    })

    await historic.save()

    ctx.body = {
      data: historic
    }
  }
})
