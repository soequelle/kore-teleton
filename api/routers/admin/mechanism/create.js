const Route = require('lib/router/route')
const lov = require('lov')
const slugify = require('underscore.string/slugify')
const { Mechanism } = require('models')

module.exports = new Route({
  method: 'post',
  path: '/',
  validator: lov.object().keys({
    name: lov.string().required()
  }),
  handler: async function (ctx) {
    var data = ctx.request.body

    const mechanism = await Mechanism.create({
      name: data.name,
      slug: slugify(data.name),
      description: data.description
    })

    ctx.body = {
      data: mechanism.toAdmin()
    }
  }
})
