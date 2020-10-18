const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deliverySchema = new Schema({

  // orderID: {
 
       // type: mongoose.Schema.Types.ObjectId,
       // ref: "orders",
 
 
 // },
  _id:{type: String,required: true},
  destination: { type: String, required: true },
  method: { type: String, required: true },
  handoverdate: { type: Date, required: true },
  receiver: { type: String, required: true },
  noofbooks: { type: Number, required: true },
  deliverydate: { type: Date, required: true },
}, {
  timestamps: true,//it will automatically create fields when it wasa created or modified  
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;


