const mongoose = require("mongoose");

const advSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  publisheddate: {
    type: Date,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  image: {
    type:String,
    required: true,
  },
  
  
});

const Advertisement = mongoose.model("advertisements",advSchema);

module.exports = Advertisement;
