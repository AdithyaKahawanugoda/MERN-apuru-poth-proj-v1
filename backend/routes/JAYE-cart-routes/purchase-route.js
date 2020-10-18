const express = require("express");
const router = express.Router();
const Purchase = require("../models/");

// @url           //purchase
// @description   purchasing an order
 
router.post("/purchase", async (req, res) => {
    try {
       
      const {cusId,ProductID,price,quantity } = req.body;
      const dbPurchase= {

        customerId:cusId,
        ProductID:ProductID,
        price: price,
        quantity:quantity
        
      };
  
      const Ppurchase= new Purchase(dbPurchase);
      await Ppurchase.save();
      res.status(200).send({ status: "Purchased", product: Ppurchase });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: error.message });
    }
  });

  module.exports = router;