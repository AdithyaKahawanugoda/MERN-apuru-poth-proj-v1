const express = require("express");
const router = express.Router();
const Order = require('../../models/JAYE-order/order.model');

// @url           /order/create
// @description   create an order
 
router.post("/create", async (req, res) => {
  try {
     
    const {cusID,productID,quantity,percentage, amount,address  } = req.body;
    const dbOrder= {

      CustomerID: cusID,
      Item:[{productID:productID,
      quantity:quantity}],
      percentage: percentage,
      checkoutAmount: amount,
      deliveryAddress:address,
      
    };

    const newOrder= new Order(dbOrder);
    await newOrder.save();
    res.status(200).send({ status: "Order Created", order: newOrder });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
});

//Handle incoming HTTP GET requests under /user url
router.route('/').get(async (req, res) => {
  //(find)mongoose method that get the list of all the users from themongodb atlas databse
  await Order.find()
  .then(orders => res.json(orders))
  .catch(err => res.status(400).json('Error: ' + err));
});

// @url           /order/delete/:id
// @description   delete order by id
router.delete("/delete/:id", async (req, res) => {
  const orderID = req.params.id;
  try {
    const deleteOrder = await Order.findByIdAndDelete(orderID);
    res.status(200).send({ status: "Order deleted", order: deleteOrder });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error with /delete/:id", error: error.message });
  }
});

module.exports = router;
