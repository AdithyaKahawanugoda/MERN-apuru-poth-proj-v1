const express = require("express");
const router = express.Router();
const Invoice = require("../../models/ADI-Product_and_Invoice/invoice-model");
const HttpError = require("../../models/ADI-Product_and_Invoice/httpErrors");

//CREATE new INVOICE for WHOLESALE ORDER
router.post("/invoice/add", async (req, res, next) => {
  try {
    const { retailShop, invoiceId, amount, description } = req.body;
    //console.log("reqBody: " + req.body.retailShop);
    let placeDate = new Date();
    console.log(placeDate);
    let existingInvoiceID; //if the same invoice ID identified from db,it will store on this variable
    try {
      existingInvoiceID = await Invoice.findOne({ invoiceId: invoiceId });
    } catch (err) {
      const error = new HttpError("Invoice ID check Failed!!!", 500);
      return next(error);
    }
    //if the same invoice ID identified from db,this will display an error msg
    if (existingInvoiceID) {
      const error = new HttpError(
        "Same Invoice ID exist in DB- Please check again",
        422
      );
      return next(error);
    }

    const createdInvoice = new Invoice({
      placeDate,
      retailShop,
      invoiceId,
      amount,
      description,
    });

    await createdInvoice.save();
    res.status(201).send({ invoice: createdInvoice });
  } catch (error) {
    console.log(error);
  }
});

//FETCH all WHOLESALE ORDERS
router.get("/invoice/all", async (req, res, next) => {
  let allOrders;
  try {
    allOrders = await Invoice.find(
      {},
      "retailShop invoiceId placeDate amount description"
    );
    res.status(200).send({ orders: allOrders }); //will return with Object IDs
  } catch (err) {
    const error = new HttpError("Fetching bulk orders failed", 500);
    return next(error);
  }
});

//FETCH specific order details
router.get("/invoice/:id", async (req, res, next) => {
  const orderId = req.params.id;
  let order;
  try {
    order = await Invoice.findById(orderId);
    if (!order) {
      //if there is no match in DB
      throw new HttpError("Can not find the invoice", 404);
    }
    res.status(200).send({ order: order });
  } catch (err) {
    const error = new HttpError("Fetching specific bulk order failed", 500);
    return next(error);
  }
});

//UPDATE specific WHOLESALE ORDER
router.post("/invoice/update/:id", async (req, res, next) => {
  const { retailShop, invoiceId, amount, description, placeDate } = req.body;
  const orderId = req.params.id;
  console.log("checkOID:" + orderId);

  try {
    invoice = await Invoice.findById(orderId);
  } catch (err) {
    //if our get req has any issues such as missiong information
    const error = new HttpError("Invoice update Failed!", 500);
    return next(error);
  }

  invoice.retailShop = retailShop;
  invoice.invoiceId = invoiceId;
  invoice.amount = amount;
  invoice.description = description;
  invoice.placeDate = placeDate;

  try {
    await invoice.save();
  } catch (err) {
    const error = new HttpError("Update process terminated!!!", 500);
    return next(error);
  }

  res.status(200).send({ invoice });
});

//DELETE specific WHOLESALE ORDER
router.delete("/invoice/delete/:id", async (req, res, next) => {
  const invoiceId = req.params.id;
  let invoice;

  //finding the specific order using ID
  try {
    invoice = await Invoice.findById(invoiceId);
  } catch (err) {
    //if our get req has any issues such as missiong information
    const error = new HttpError("Can not delete the product!", 500);
    return next(error);
  }

  //delete the specific product
  try {
    await invoice.remove();
    res.status(200).send({ message: "Bulk Order Deleted!" });
  } catch (err) {
    //if our get req has any issues such as missiong information
    const error = new HttpError("Can not expecute delete operation!", 500);
    return next(error);
  }
});

module.exports = router;
