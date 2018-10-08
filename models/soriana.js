const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4 } = require('uuid')
const dataTables = require('mongoose-datatables')

const sorianaSchema = new Schema({
  dateCreated: { type: Date, required: true },
  store: { type: Number, required: true },
  donors: { type: Number, required: true },
  amount: { type: Number, required: true },

  uuid: { type: String, default: v4 },
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true
})

sorianaSchema.plugin(dataTables)

sorianaSchema.methods.toAdmin = function () {
  return {
    uuid: this.uuid,
    dateCreated: this.dateCreated,
    store: this.store,
    donors: this.donors,
    amount: this.amount,
    createdAt: this.createdAt
  }
}

sorianaSchema.methods.toPublic = function () {
  return {
    uuid: this.uuid,
    dateCreated: this.dateCreated,
    store: this.store,
    donors: this.donors,
    amount: this.amount,
    createdAt: this.createdAt
  }
}

sorianaSchema.plugin(dataTables, {
  formatters: {
    toAdmin: (item) => item.toAdmin(),
    toPublic: (item) => item.toPublic()
  }
})

module.exports = mongoose.model('Soriana', sorianaSchema)
