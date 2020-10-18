const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema({

    CustomerID:{

          type: mongoose.Schema.Types.ObjectId,
          ref: "users",

    },

    Item: [{

                   productID:{

                    type: mongoose.Schema.Types.ObjectId,
                    ref:"products"
                   },

                   quantity:{
                       
                     type: Number,
             //        required: true,
                     trim: true,

                   }
    }],

    // paymentType:{

    //   type: String,
    //   trim: true,

    // },


    percentage:{

        type: String,
        ref:"discounts",
          
           
    },

    checkoutAmount:{
          
        type: Number,
        //required: true,
        trim: true,  

    },

    deliveryAddress:{

        type: String,
       // required: true,
        trim: true,  
    },

     
});

const order = mongoose.model("orders", orderSchema);

module.exports = order;