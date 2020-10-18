const router = require("express").Router();

const discountSchema = require("../../models/LIHI-Admin/discount.model");
const Product = require('../../models/ADI-Product_and_Invoice/product-model')

// @url /discount/create-discount/:id
// @description create order

// router.route("/create-discount").post((req, res, next) => {
//   discountSchema.create(req.body, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       console.log(data);
//       res.json(data);
//     }
//   });
// });

router.post('/create-discount', async (req, res) => {
  try {
    const {itemId, publishingTitle, marketPrice, percentage, validDate, ammount} = req.body
    let newDiscount = {
      itemId: itemId,
      publishingTitle: publishingTitle,
      marketPrice: marketPrice,
      percentage: percentage,
      ammount: ammount,
      validDate: validDate
    }
    const discount = new discountSchema(newDiscount)
    await discount.save();
    res.status(200).send({status: 'Discount Added', discount: discount});
  } catch (error) {
    res.status(500).send({status: 'Error with create discount'});
  }
})

// @url /discount/get-discount
// @description retrieve
router.get("/", async (req, res) => {
  try {
    const items = await discountSchema.find({});
    res.status(200).send({ items: items });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error in get items", error: error.message });
    console.log(error);
  }
});

// Get Single Discount
router.route("/get/:id").get((req, res, next) => {
  discountSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// @url /discount/update-discount/:id
// @description update order by id

router.route("/updatediscount/:id").post((req, res) => {
  discountSchema
    .findById(req.params.id)
    .then((discounts) => {
      discounts.publishingTitle = req.body.publishingTitle;
      discounts.marketPrice = req.body.marketPrice;
      discounts.percentage = req.body.percentage;
      discounts.ammount = req.body.ammount;
      discounts.validDate = req.body.validDate;

      discounts
        .save()
        .then(() => res.json("updated"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// @url /discount/delete-discount/:id
// @description delete order by id

router.route("delete/:id").delete((req, res) => {
  discountSchema
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Deleted"))
    .catch((err) => {
      res.json(err);
    });
});

router.get('/getallitemsname', async (req, res) => {
  try {
    const products = await Product.find({}, "publishingTitle")
    res.status(200).send({ items: products})
  } catch (error) {
    res.status(500).send({ error: error.message})
  }
})

module.exports = router;
