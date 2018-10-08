const Route = require('lib/router/route')
const { Mechanism } = require('models')

module.exports = new Route({
  method: 'post',
  path: '/:uuid/restore',
  handler: async function (ctx) {
    var mechanismId = ctx.params.uuid

    const mechanism = await Mechanism.findOne({'uuid': mechanismId, 'isDeleted': true})
    ctx.assert(mechanism, 404, 'Mechanism not found')

    mechanism.set({
      isDeleted: false
    })

    mechanism.save()

    ctx.body = {
      data: mechanism.toAdmin()
    }
  }
})
