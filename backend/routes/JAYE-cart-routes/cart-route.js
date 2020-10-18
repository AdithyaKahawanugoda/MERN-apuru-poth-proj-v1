const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/HSKI-User/user.model')
const Product = require('../../models/ADI-Product_and_Invoice/product-model')

// @url           /cart/add
// @description   add products to the cart
router.post("/add", auth, async (req, res) => {
  try {
    const { productId, price, quantity } = req.body;
    const user = await User.findById(req.user._id)
    const product = await Product.findById(productId)
    if (!user) {
      throw new Error('There is no user')
    }

    if (!product) {
      throw new Error('There is no Product')
    }
    let cartItem = {
      productId: productId,
      productName: product.publishingTitle,
      productPrice: price,
      quantity: quantity
    };

    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { cart: cartItem } },
      { new: true, upsert: true }
    )
    res.status(200).send({ status: "Item Added to Cart", cart: cartItem });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
});

// @url           /cart/display
// @description   retrieve cart
router.get("/display", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      throw new Error('There is no user')
    }
    res.status(200).send({ status: "cart retrieved", cart: req.user.cart });
  } catch (error) {
    res.status(500).send({ status: "Error with /all", error: error.message });
  }
});

// // @url           /cart/update/:id
// // @description   update quantity
router.put("/update/:id", auth, async (req, res) => {
  const cartId = req.params.id
  try {
    const { quantity, price } = req.body;
    const user = await User.findById(req.user._id)
    if (!user) {
      throw new Error('There is no user')
    }
    user.cart.id(cartId).quantity = quantity
    user.cart.id(cartId).productPrice = price
    await user.save()

    res.status(200).send({ status: "quantity updated", cart: user.cart.id(cartId) });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// // @url           /ocart/delete/:id
// // @description   delete products from cart 
router.delete("/delete/:id", auth, async (req, res) => {
  const itemId = req.params.id;
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      throw new Error('There is no user')
    }
    const deleteItem = await User.update(
      { _id: req.user._id },
      { $pull: { cart: user.cart.id(itemId) } },
      { multi: true }
    )
    res.status(200).send({ status: "product removed", cart: deleteItem });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error with /delete/:id", error: error.message });
  }
});

module.exports = router;


