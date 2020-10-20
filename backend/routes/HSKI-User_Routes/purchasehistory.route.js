const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/HSKI-User/user.model');
const Order = require('../../models/JAYE-order/order.model');
// const Product = require('../../models/ADI-Product_and_Invoice/product-model');

//@url   GET/purchasehistory/display
//@description   display purchase history from orders
router.get("/display", auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id)
      await Order.find()
      .then(orders => res.json(orders))
    //   .catch(err => res.status(400).json('Error: ' + err));
      if (!user) {
        throw new Error('There is no user')
      }
      res.status(200).send({ status: "purchase history retrieved", purchasehistory: req.user.purchasehistory });
    } catch (error) {
      res.status(500).send({ status: "Error with /all", error: error.message });
      res.status(400).json('Error: ' + err);
    }
});

module.exports = router;