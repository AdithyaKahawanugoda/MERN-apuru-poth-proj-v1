const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  retailShop: {
    type: String,
    required: true,
  },
  invoiceId: {
    type: String,
    required: true,
  },
  placeDate: {
    type: Date,
  },
  amount: {
    type: Number,
  },
  description: {
    type: String,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
