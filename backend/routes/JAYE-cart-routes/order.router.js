const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const Order = require('../../models/JAYE-order/order.model');

// @url           /order/create
// @description   create an order
 
router.post("/create",auth, async (req, res) => {
  try {
     
    const { cartItems, totalPrice, description } = req.body;

    const address = req.user.address_line_1+ ", " + req.user.address_line_2 + "," + req.user.city + ", " + req.user.area_province


    const newOrder = {
      customerId: req.user.id,
      customerName: req.user.name,
      customerEmail: req.user.email,
      cutomerAddress: address,
      totalPrice: totalPrice,
      description: description,
      deliveryDate: new Date(),
      handOverDate: new Date(),
      deliverMethod: ""
    }


    const order = new Order(newOrder)
    await order.save().then(() => {
      cartItems.map((item) => {
        let arrayItem = {
          itemId: item.productId,
          itemName: item.productName,
          quantity: item.quantity
        }
        order.items.unshift(arrayItem)
        order.save()
      })  
    })

    req.user.cart = []
    await req.user.save()

    res.status(200).send({ status: "Order Created"});
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

router.get('/getorder/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    res.status(200).send({status: 'order fetched', order: order})
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
})

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
