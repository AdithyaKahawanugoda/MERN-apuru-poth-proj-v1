const mongoose = require("mongoose");


const newsSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true,
  },

  createDate: {
    type: Date,
    required: true,
    trim: true,
  },

  content: {
    type: String,
    required: true,
    trim: true,
  },
  


});
{
  timestamps :true ;
}
const Newsletter = mongoose.model("newsletters",newsSchema);

module.exports = Newsletter;
