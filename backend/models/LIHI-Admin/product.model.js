const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({

  publishingTitle:{
	type: String
  },

  marketPrice:{
	type : String
  },
  
 

}, {
    collection: 'product'
  })

module.exports = mongoose.model('product', productSchema)