const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  publishingTitle: {
    type: String,
    required: true,
  },
  originalTitle: {
    type: String,
    required: true,
  },
  translator: {
    type: String,
    required: false,
  },
  originalAuthor: {
    type: String,
    required: false,
  },
  ISBN: {
    type: String,
    required: false,
    unique: false,
  },
  license: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  edition: {
    type: Number,
    required: false,
  },
  translatorContact: {
    type: String,
    required: false,
  },
  press: {
    type: String,
    required: false,
  },
  proofReader: {
    type: String,
    required: false,
  },
  coverDesigner: {
    type: String,
    required: false,
  },
  typeSetter: {
    type: String,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  bookImage: {
    type: String,
    required: true,
  },
  marketPrice: {
    type: Number,
    required: false,
  },
  charges: {
    coverCost: {
      type: Number,
      required: false,
    },
    licenseCost: Number,
    writerPayment: Number,
    proofReadingPayment: {
      type: Number,
      required: false,
    },
    typeSetterPayment: Number,
    printCost: {
      type: Number,
      required: false,
    },
    other: Number,
  },
  averageRating: {
    type: Number,
  },
  addDate: {
    type: Date,
    required: true,
  }
});

//productSchema.plugin(uniqueValidator);
const Product = mongoose.model("products", productSchema);

module.exports = Product;
