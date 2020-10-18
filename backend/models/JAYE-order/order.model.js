const mongoose = require("mongoose");
//const validator = require("validator");

const orderSchema = new mongoose.Schema({

    orderID:{

          type: String,
          required: true,
          trim: true,

    },

    // ITem:{

    //       product:{

    //                productID:{

    //                 type: String,
    //                 required: true,
    //                 trim: true,
    //                },

    //                quantity:{
                       
    //                  type: String,
    //                  required: true,
    //                  trim: true,

    //                }
    // }

    // },

    discount:{

        type: Number,
        required: true,
        trim: true,  
           
    },

    checkoutAmount:{
          
        type: Number,
        required: true,
        trim: true,  

    },

    deliveryAddress:{

        type: String,
        //required: true,
        trim: true,  
    }
});

const order = mongoose.model("order", orderSchema);

module.exports = order;
