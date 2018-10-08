const Route = require('lib/router/route')
const lov = require('lov')
const parse = require('csv-parse/lib/sync')
const { Historic, Mechanism, Soriana } = require('models')
const _ = require('lodash')
const moment = require('moment')

module.exports = new Route({
  method: 'post',
  path: '/',
  bodySize: '50mb',
  validator: lov.object().keys({
    mechanism: lov.string().required()
  }),
  handler: async function (ctx) {
    let {mechanism, file} = ctx.request.body
    const dataType = file.mimeType

    if (dataType !== 'text/csv' && dataType !== 'text/plain') {
      ctx.throw(400, 'El archivo debe ser de tipo csv ó txt')
    }

    const historicFile = await Historic.findOne({name: file.name})
    if (historicFile) {
      ctx.throw(400, 'El archivo ya existe en la base de datos.')
    }

    mechanism = await Mechanism.findOne({uuid: mechanism})
    ctx.assert(mechanism, 404, 'Mecanismo de donación no encontrado.')

    var data = parse(file.content, {
      columns: true,
      delimiter: '|',
      max_limit_on_data_read: 1028000000000,
      skip_lines_with_error: true
    })
    data.shift()
    data.splice(-1, 1)

    let totalAmount = data.reduce((a, b) => {
      return a + Number(b['IMPORTE'])
    }, 0)

    let donors = data.reduce((a, b) => {
      return a + Number(b['DONADORES'])
    }, 0)

    let totalAmountMechanism = mechanism.totalAmount
    let donorsMechanism = mechanism.donors

    const historic = await Historic.create({
      name: file.name,
      mechanism: mechanism._id,
      registers: data.length,
      totalAmount: totalAmount,
      donors: donors
    })

    mechanism.set({
      totalAmount: totalAmountMechanism + totalAmount,
      donors: donorsMechanism + donors
    })

    await mechanism.save()

//    if (mechanism.slug === 'soriana') {
    for (let d of data) {
      const inputData = {
        dateCreated: moment(d['FECHA'], 'YYYYMMDD   hh:mma').utc(),
        store: d['TIENDA'],
        donors: d['DONADORES'],
        amount: d['IMPORTE'],
        historic: historic._id
      }

      try {
        await Soriana.create(inputData)
      } catch (e) {
        console.log('Error: ', e)
      }
    }
   // }

    ctx.body = {
      data: historic.toAdmin()
    }
  }
})
