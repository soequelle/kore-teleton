const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { v4 } = require('uuid')
const dataTables = require('mongoose-datatables')

const mechanismSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  layout: [{
    seq: { type: Number },
    field: { type: String },
    type: { type: String },
    length: { type: Number },
    format: { type: String },
    observations: { type: String }
  }],
  slug: { type: String, required: true },
  totalAmount: { type: Number, default: 0 },
  donors: { type: Number, default: 0 },

  uuid: { type: String, default: v4 },
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true
})

mechanismSchema.plugin(dataTables)

mechanismSchema.methods.toAdmin = function () {
  return {
    uuid: this.uuid,
    name: this.name,
    layout: this.layout,
    slug: this.slug,
    totalAmount: this.totalAmount,
    donors: this.donors,
    description: this.description,
    createdAt: this.createdAt
  }
}

mechanismSchema.methods.toPublic = function () {
  return {
    uuid: this.uuid,
    name: this.name,
    layout: this.layout,
    slug: this.slug,
    totalAmount: this.totalAmount,
    donors: this.donors,
    description: this.description,
    createdAt: this.createdAt
  }
}

mechanismSchema.plugin(dataTables, {
  formatters: {
    toAdmin: (item) => item.toAdmin(),
    toPublic: (item) => item.toPublic()
  }
})

module.exports = mongoose.model('Mechanism', mechanismSchema)
