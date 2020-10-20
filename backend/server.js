const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// @import routes
const userRoutes = require("./routes/HSKI-User_Routes/user.route");
const feedbackRoutes = require("./routes/RAVB-Feedback_Routes/feedback.rotue");
const cartRoute = require("./routes/JAYE-cart-routes/cart-route");
const advertisementRoute = require("./routes/Binu-Adv-routes/adv.routes");
const discountRoutes = require("./routes/LIHI-Admin_Routes/discount.route");
const inventroyRoutes = require("./routes/ADI-Inventory_and_Wholesale_Routes/inventory-routes");
const wholesaleRoutes = require("./routes/ADI-Inventory_and_Wholesale_Routes/wholesale-routes");
const Chartroutes = require("./routes/RAVB-Feedback_Routes/admin_dashboard.route")
const AdminRoutes = require("./routes/LIHI-Admin_Routes/admin.route")
const DeliveryRoutes = require("./routes/YASA-Delivery_Routes/delivery.router")
const OrderRoutes = require('./routes/JAYE-cart-routes/order.router')
const requestBook = require('./routes/NITH-RequestBook_Routes/request.routes')
const wishListRoute = require('./routes/HSKI-User_Routes/wishlist.route')
const purchasehistoryRoute = require('./routes/HSKI-User_Routes/purchasehistory.route')
// report generate routes
const cartReportGenerateRoute = require("./routes/PDF-Generator/PDF-Generate-Cart")
const requestBookReportGenerateRoute = require("./routes/PDF-Generator/PDF-Generate-RequestBook")
const deliveryReportGenerateRoute = require('./routes/PDF-Generator/PDF-Generate-Delivery')
const discountReportGenerateRoute = require('./routes/PDF-Generator/PDF-Generate-Discount')
const wishlistReportGenerateRoute = require('./routes/PDF-Generator/PDF-Generate-WishList')
const advertisementReportGenerateRoute = require('./routes/PDF-Generator/PDF-Generate-Advertisement')

const PORT = process.env.PORT || 8059;

app.use(cors());
app.use(bodyParser.json());

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success");
});

// rotues
app.use("/user", userRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/inventory", inventroyRoutes);
app.use("/wholesale", wholesaleRoutes);
app.use("/cart", cartRoute);
app.use("/advertisement", advertisementRoute);
app.use("/discounts", discountRoutes);
app.use('/admin', Chartroutes)
app.use('/adminprofile', AdminRoutes)
app.use('/cartreport', cartReportGenerateRoute)
app.use('/requestbookreport', requestBookReportGenerateRoute)
app.use('/delivery', DeliveryRoutes)
app.use('/order', OrderRoutes)
app.use('/request', requestBook)
app.use('/wishlist', wishListRoute)
app.use('/deliveryreport', deliveryReportGenerateRoute)
app.use('/discountreport', discountReportGenerateRoute)
app.use('/wishlistreport', wishlistReportGenerateRoute)
app.use('/advertismentreport', advertisementReportGenerateRoute)
app.use('/purchasehistory', purchasehistoryRoute)

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
