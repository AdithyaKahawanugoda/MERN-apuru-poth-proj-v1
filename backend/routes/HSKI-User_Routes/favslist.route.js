const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/HSKI-User/user.model')
const Product = require('../../models/ADI-Product_and_Invoice/product-model')

// @url           POST/favslist/add
// @description   add products to the favs list
router.post("/add", auth, async (req, res) => {
    try {
      const { productId } = req.body;
      const user = await User.findById(req.user._id)
      const product = await Product.findById(productId)
      if (!user) {
        throw new Error('There is no user')
      }
  
      if (!product) {
        throw new Error('There is no Product')
      }
      let favslistItem = {
        productId: productId,
        productName: product.publishingTitle,
        coverImage: product.coverImage,
      };
  
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { favslist: favslistItem } },
        { new: true, upsert: true }
      )
      res.status(200).send({ status: "Added to favslist", favslist: favslistItem });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: error.message });
    }
  });

  // @url           GET/favslist/display
// @description   retrieve wishlist
router.get("/display", auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id)
      if (!user) {
        throw new Error('There is no user')
      }
      res.status(200).send({ status: "Favslist retrieved", favslist: req.user.favslist });
    } catch (error) {
      res.status(500).send({ status: "Error with /all", error: error.message });
    }
  });

  // // @url           DELETE/avslist/delete/:id
// // @description   delete products from favs list 
router.delete("/delete/:id", auth, async (req, res) => {
    const itemId = req.params.id;
    try {
      const user = await User.findById(req.user._id)
      if (!user) {
        throw new Error('There is no user')
      }
      const deleteItem = await User.update(
        { _id: req.user._id },
        { $pull: { favslist: user.favslist.id(itemId) } },
        { multi: true }
      )
      res.status(200).send({ status: "product removed from the list", favslist: deleteItem });
    } catch (error) {
      res
        .status(500)
        .send({ status: "error with /delete/:id", error: error.message });
    }
  });
  
  module.exports = router;