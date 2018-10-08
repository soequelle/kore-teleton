const Route = require('lib/router/route')
const lov = require('lov')
const { Historic } = require('models')

module.exports = new Route({
  method: 'post',
  path: '/:uuid',
  validator: lov.object().keys({
    name: lov.string().required(),
    mechanism: lov.string().required(),
    registers: lov.number().required()
  }),
  handler: async function (ctx) {
    var historicId = ctx.params.uuid
    var data = ctx.request.body

    const historic = await Historic.findOne({'uuid': historicId, 'isDeleted': false})
    ctx.assert(historic, 404, 'Historic not found')

    historic.set({
      name: data.name,
      mechanism: data.mechanism,
      registers: data.registers
    })

    await historic.save()

    ctx.body = {
      data: historic.toAdmin()
    }
  }
})
