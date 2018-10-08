const Route = require('lib/router/route')
const { Historic } = require('models')

module.exports = new Route({
  method: 'post',
  path: '/:uuid/restore',
  handler: async function (ctx) {
    var historicId = ctx.params.uuid

    const historic = await Historic.findOne({'uuid': historicId, 'isDeleted': true})
    ctx.assert(historic, 404, 'Historic not found')

    historic.set({
      isDeleted: false
    })

    historic.save()

    ctx.body = {
      data: historic.toAdmin()
    }
  }
})
