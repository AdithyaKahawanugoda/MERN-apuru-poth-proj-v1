const mongoose = require('mongoose')
const validator = require('validator')

const requestSchema = new mongoose.Schema({
    bookName : {
        type: String,
        required: true,
        trim: true
    },
    authorName : {
        type: String,
        trim: true
    },
    printedYear : {
        type: Number,
        trim: true,
    },
    userID : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    userName: {
      type: String,
      required: true
    },
    profileImage: {
      type: String,
      required: true
    },
    userEmail : {
      type: String,
      required: true,
      trim: true,
      validate(value){
        if(!validator.isEmail(value)) {
          throw new Error('Please enter valid email address')
        }
      }  
    },
    
})

const Request = mongoose.model('requests', requestSchema)

module.exports = Request;
