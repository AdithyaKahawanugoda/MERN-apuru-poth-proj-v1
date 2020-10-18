const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require('../models/LIHI-Admin/admin.profile.model')

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    const decode = jwt.verify(token, "jwtSecret")
    const admin = await Admin.findOne({_id: decode._id, "tokens.token": token})
    if (!admin) {
      throw new Error("Please Authenticated as Admin")
    }
    req.token = token
    req.admin = admin
    next()
  } catch (error) {
    res.status(401).send({ message: error.message });
    console.log("Error in adminAuth.js middleware ", error.message);
  }
}

module.exports = adminAuth