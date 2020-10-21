const express = require("express");
const router = express.Router();
const Product = require("../../models/ADI-Product_and_Invoice/product-model");
const upload = require("../../middleware/image.upload.middleware");
const sharp = require("sharp");
const HttpError = require("../../models/ADI-Product_and_Invoice/httpErrors");
const pdf = require("html-pdf");
const pdfTemplate = require("./documents");
const { route } = require("../Binu-Adv-routes/adv.routes");
const fs = require("fs");

// @url           POST /admin/product/add
// @description   add new book
// @Action        admin
router.post("/product/add", async (req, res, next) => {
  try {
    const {
      publishingTitle,
      originalTitle,
      translator,
      originalAuthor,
      ISBN,
      license,
      quantity,
      edition,
      translatorContact,
      press,
      proofReader,
      coverDesigner,
      typeSetter,
      weight,
      marketPrice,
      coverCost,
      licenseCost,
      writerPayment,
      proofReadingPayment,
      typeSetterPayment,
      printCost,
      other,
      bookImage,
      date,
    } = req.body;

    let existingISBN; //if the same ISBN identified from db,it will store on this variable
    try {
      existingISBN = await Product.findOne({ ISBN: ISBN });
    } catch (err) {
      const error = new HttpError("Book registration Failed!!!", 500);
      return next(error);
    }
    //if the same ISBN identified from db,this will display an error msg
    if (existingISBN) {
      const error = new HttpError(
        "ISBN already exist - Please check again",
        422
      );
      return next(error);
    }
    //using product model,new book will get saved within db
    const createdProduct = new Product({
      publishingTitle,
      originalTitle,
      translator,
      originalAuthor,
      ISBN,
      license,
      quantity,
      edition,
      translatorContact,
      press,
      proofReader,
      coverDesigner,
      typeSetter,
      weight,
      bookImage,
      marketPrice,
      charges: {
        coverCost,
        licenseCost,
        writerPayment,
        proofReadingPayment,
        typeSetterPayment,
        printCost,
        other,
      },
      averageRating: 0,
      addDate: date,
    });

    await createdProduct.save();
    res.status(201).send({ product: createdProduct });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating product failed!", 500);
    return next(error);
  }
});

// @url           GET /admin/product/all
// @description   fetch all books with some details
// @Action        admin
router.get("/product/all", async (req, res, next) => {
  let allProds;
  try {
    allProds = await Product.find(
      {},
      "publishingTitle marketPrice ISBN translator quantity bookImage averageRating charges"
    ); //can fetch anything ex-charges.coverCost
    res.status(200).send({ books: allProds }); //will return with Object IDs
  } catch (err) {
    const error = new HttpError("Fetching products failed", 500);
    return next(error);
  }
});

// @url           GET /admin/product/:id
// @description   fetch specific book all details
// @Action        admin
router.get("/product/:id", async (req, res) => {
  const prodId = req.params.id;
  try {
    const product = await Product.findById(prodId);
    if (!product) {
      //if there is no match in DB
      throw new HttpError("Can not find the product", 404);
    }

    res.status(200).send({
      product: product,
      charges: product.charges,
    });
  } catch (err) {
    //if our get req has any issues such as missiong information
    console.log(err.message);
    throw new HttpError("Fetching using ID failed!", 500);
  }
});

// @url           PUT /admin/product/update/:id
// @description   update specific book details
// @Action        admin
router.post("/product/update/details/:id", async (req, res, next) => {
  // const coverImage = await sharp(req.file.buffer)
  //   .resize({ width: 250, height: 550 })
  //   .png()
  //   .toBuffer();
  const {
    publishingTitle,
    originalTitle,
    translator,
    originalAuthor,
    ISBN,
    license,
    quantity,
    edition,
    translatorContact,
    press,
    proofReader,
    coverDesigner,
    typeSetter,
    weight,
    marketPrice,
  } = req.body;
  const prodId = req.params.id;

  try {
    const product = await Product.findById(prodId);
  } catch (err) {
    //if our get req has any issues such as missiong information
    const error = new HttpError("Product update Failed!", 500);
    return next(error);
  }

  product.publishingTitle = publishingTitle;
  product.originalTitle = originalTitle;
  product.translator = translator;
  product.originalAuthor = originalAuthor;
  product.ISBN = ISBN;
  product.license = license;
  product.quantity = quantity;
  product.edition = edition;
  product.translatorContact = translatorContact;
  product.press = press;
  product.proofReader = proofReader;
  product.coverDesigner = coverDesigner;
  product.typeSetter = typeSetter;
  product.weight = weight;
  // product.coverImage = coverImage;
  product.marketPrice = marketPrice;

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError("Update process terminated!!!", 500);
    return next(error);
  }

  res.status(200).send({ product });
});

router.post("/product/update/charges/:id", async (req, res, next) => {
  // const coverImage = await sharp(req.file.buffer)
  //   .resize({ width: 250, height: 550 })
  //   .png()
  //   .toBuffer();
  const {
    coverCost,
    licenseCost,
    writerPayment,
    proofReadingPayment,
    typeSetterPayment,
    printCost,
    other,
  } = req.body;

  const prodId = req.params.id;

  try {
    const product = await Product.findById(prodId);
  } catch (err) {
    //if our get req has any issues such as missiong information
    const error = new HttpError("Product update Failed!", 500);
    return next(error);
  }

  product.charges.coverCost = coverCost;
  product.charges.licenseCost = licenseCost;
  product.charges.writerPayment = writerPayment;
  product.charges.proofReadingPayment = proofReadingPayment;
  product.charges.typeSetterPayment = typeSetterPayment;
  product.charges.printCost = printCost;
  product.charges.other = other;

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError("Update process terminated!!!", 500);
    return next(error);
  }

  res.status(200).send({ product });
});

//@url PUT/admin/product/update/cover/:id
//@description update cover image of an specific book
//@Action admin
router.post(
  "/product/update/cover/:id",
  upload.single("cover"),
  async (req, res, next) => {
    const coverImage = await sharp(req.file.buffer)
      .resize({ width: 250, height: 550 })
      .png()
      .toBuffer();
    const prodId = req.params.id;
    try {
      const product = await Product.findById(prodId);
    } catch (err) {
      //if our get req has any issues such as missiong information
      const error = new HttpError("Image update Failed!", 500);
      return next(error);
    }
    product.coverImage = coverImage;
    try {
      await product.save();
    } catch (err) {
      const error = new HttpError("Update process terminated!!!", 500);
      return next(error);
    }

    res.status(200).send({ image: coverImage });
  }
);

// @url           DELETE /admin/product/delete/:id
// @description   delete specific book
// @Action        admin
router.delete("/product/delete/:id", async (req, res, next) => {
  const prodId = req.params.id;
  let product;

  //finding the specific product using ID
  try {
    product = await Product.findById(prodId);
  } catch (err) {
    //if our get req has any issues such as missiong information
    const error = new HttpError("Can not delete the product!", 500);
    return next(error);
  }

  //delete the specific product
  try {
    await product.remove();
    res.status(200).send({ message: "Place Deleted!" });
  } catch (err) {
    //if our get req has any issues such as missiong information
    const error = new HttpError("Can not delete the product!", 500);
    return next(error);
  }
});

//POST req to create report
router.post("/report", (req, res, next) => {
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile(`${__dirname}/documents/ProductReport.pdf`, (err) => {
      if (err) {
        res.send(Promise.reject());
      }
      res.send(Promise.resolve());
    });
});

//GET req to preview report
// router.get("/getreport", (req, res, next) => {
//   res.sendFile(`${__dirname}/ProductReport.pdf`);
// });

module.exports = router;
