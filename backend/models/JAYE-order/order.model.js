const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  items: [{
    
  }]
});

const order = mongoose.model("orders", orderSchema);

module.exports = order;