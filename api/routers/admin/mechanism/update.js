const Route = require('lib/router/route')
const lov = require('lov')
const { Mechanism } = require('models')

module.exports = new Route({
  method: 'post',
  path: '/:uuid',
  validator: lov.object().keys({
    name: lov.string().required()
  }),
  handler: async function (ctx) {
    var mechanismId = ctx.params.uuid
    var data = ctx.request.body

    const mechanism = await Mechanism.findOne({'uuid': mechanismId, 'isDeleted': false})
    ctx.assert(mechanism, 404, 'Mechanism not found')

    mechanism.set({
      name: data.name,
      description: data.description
    })

    await mechanism.save()

    ctx.body = {
      data: mechanism.toAdmin()
    }
  }
})
