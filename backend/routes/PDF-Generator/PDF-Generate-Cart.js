const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors());

const fs = require("fs");
const PDFDocument = require("./pdfkit-tables");

router.post("/generatecartreport", async (req, res) => {
//load cuurent time
var currentDate = new Date();

var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();
var seconds = currentDate.getSeconds();
var date = currentDate.getDate();
var month = currentDate.getMonth(); //Be careful! January is 0 not 1
var year = currentDate.getFullYear();
var timestamp =
year +
"-" +
(month + 1) +
"-" +
date +
"-" +
hours +
"-" +
minutes +
"-" +
seconds;

 const cartReportRequest = req.body.cartItems;
// // Create The PDF document

 var myDoc = new PDFDocument({ bufferPages: true });

 let buffers = [];
myDoc.on("data", buffers.push.bind(buffers));
myDoc.on("end", () => {
let pdfData = Buffer.concat(buffers);
res
.writeHead(200, {
"Content-Length": Buffer.byteLength(pdfData),
"Content-Type": "application/pdf",
"Content-disposition": `attachment;filename=incompleteorderlist_${timestamp}.pdf`,
})
.end(pdfData);
});

 //myDoc.font("Times-Roman").fontSize(12).text(`this is a test text`);
// Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
myDoc
.fillColor("#444444")
.fontSize(20)
.text("User Cart Report", 110, 57)
.fontSize(10)
.text("Apuru Book Publishers", 200, 50, { align: "right" })
.text("291/B,Alawwa", 200, 65, { align: "right" })
.text("Kurunagala", 200, 80, { align: "right" })
.moveDown();

 // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
const table = {
headers: ["Item Code", "Item Name", "Quantity", "Price"],
rows: [],
};

 for (const cartItem of cartReportRequest) {
  table.rows.push([
  cartItem.productId,
  cartItem.productName,
  cartItem.quantity,
  cartItem.productPrice,
  ]);
}

 // Draw the table
myDoc.moveDown().table(table, 10, 125, { width: 590 });
myDoc.end();

 //res.json("Generated Success");
});

module.exports = router;