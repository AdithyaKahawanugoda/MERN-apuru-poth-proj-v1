const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/HSKI-User/user.model')
const Product = require('../../models/ADIK-Product/product-model')

// @url           POST/wishlist/add
// @description   add products to the cart
router.post("/add", auth, async (req, res) => {
  try {
    const { productId, price } = req.body;
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
      productPrice: price,
      coverImage: product.coverImage,
    };

    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { wishlist: wishlistItem } },
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
    res.status(200).send({ status: "wishlist retrieved", wishlist: req.user.wishlist });
  } catch (error) {
    res.status(500).send({ status: "Error with /all", error: error.message });
  }
});

// // @url           PUT/wishlist/update/:id
// // @description   update quantity
// router.put("/update/:id", auth, async (req, res) => {
//   const wishlistId = req.params.id
//   try {
//     const { price } = req.body;
//     const user = await User.findById(req.user._id)
//     if (!user) {
//       throw new Error('There is no user')
//     }
//     user.wishlist.id(wishlistId).productPrice = price
//     await user.save()

//     res.status(200).send({ status: "list updated", wishlist: user.wishlist.id(wishlistId) });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// // @url           DELETE/wishlist/delete/:id
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
      { $pull: { wishlist: user.wishlist.id(itemId) } },
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