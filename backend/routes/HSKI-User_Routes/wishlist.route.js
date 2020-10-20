const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/HSKI-User/user.model')
const Product = require('../../models/ADI-Product_and_Invoice/product-model')

// @url           POST/wishlist/add
// @description   add products to the wish list
router.post("/add/:id", auth, async (req, res) => {
  const productId = req.params.id
  try {
    const user = await User.findById(req.user._id)
    const product = await Product.findById(productId)
    if (!user) {
      throw new Error('There is no user')
    }

    if (!product) {
      throw new Error('There is no Product')
    }
    let wishlistItem = {
      productId: productId,
      productName: product.publishingTitle,
      productPrice: product.marketPrice,
      coverImage: product.bookImage,
    };

    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { wishList: wishlistItem } },
      { new: true, upsert: true }
    )
    res.status(200).send({ status: "Added to Wishlist", wishlist: wishlistItem });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
});

// @url           GET/wishlist/display
// @description   retrieve wishlist
router.get("/display", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      throw new Error('There is no user')
    }
    res.status(200).send({ status: "wishlist retrieved", wishlist: req.user.wishList });
  } catch (error) {
    res.status(500).send({ status: "Error with /all", error: error.message });
  }
});

// // @url           DELETE/wishlist/delete/:id
// // @description   delete products from wish list 
router.delete("/delete/:id", auth, async (req, res) => {
  const itemId = req.params.id;
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      throw new Error('There is no user')
    }
    const deleteItem = await User.update(
      { _id: req.user._id },
      { $pull: { wishList: user.wishList.id(itemId) } },
      { multi: true }
    )
    res.status(200).send({ status: "product removed from the list", wishlist: deleteItem });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error with /delete/:id", error: error.message });
  }
});

module.exports = router;