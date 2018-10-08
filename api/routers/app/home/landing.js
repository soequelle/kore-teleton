const Route = require('lib/router/route')

const { Mechanism } = require('models')

module.exports = new Route({
  method: 'get',
  path: '/',
  handler: async function (ctx) {
    let mechanisms = await Mechanism.find({'isDeleted': false})

    ctx.body = {
      mechanisms: mechanisms.map(item => item.toAdmin())
    }
  }
})
