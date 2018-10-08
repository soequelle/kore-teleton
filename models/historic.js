const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4 } = require('uuid')
const dataTables = require('mongoose-datatables')

const historicSchema = new Schema({
  name: { type: String, required: true },
  mechanism: { type: Schema.Types.ObjectId, ref: 'Mechanism', required: true },
  registers: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  donors: { type: Number, required: true },

  uuid: { type: String, default: v4 },
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true
})

historicSchema.plugin(dataTables)

historicSchema.methods.toAdmin = function () {
  return {
    uuid: this.uuid,
    name: this.name,
    mechanism: this.mechanism,
    registers: this.registers,
    donors: this.donors,
    totalAmount: this.totalAmount,
    createdAt: this.createdAt
  }
}

historicSchema.methods.toPublic = function () {
  return {
    uuid: this.uuid,
    name: this.name,
    mechanism: this.mechanism,
    registers: this.registers,
    donors: this.donors,
    totalAmount: this.totalAmount,
    createdAt: this.createdAt
  }
}

historicSchema.plugin(dataTables, {
  formatters: {
    toAdmin: (item) => item.toAdmin(),
    toPublic: (item) => item.toPublic()
  }
})

module.exports = mongoose.model('Historic', historicSchema)
