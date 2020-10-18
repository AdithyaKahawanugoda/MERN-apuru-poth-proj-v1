const mongoose = require('mongoose')
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true

  },
  email: {
    type: String, 
    lowercase: true,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please enter valid email address");
      }
    },
  },
  phoneNumber: {
    type: String, 
    required: true,
    trim: true,
    maxlength: 10,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Please enter valid mobile number");
      }
    },
  },
  DOB: { 
    type: Date, 
    required: true 
  },
  profileImage: { 
    type: String, 
    required: true
  },
  password: { 
    type: String, 
    required: true,
    trim: true
  },
  experience: [{
    title: {
      type: String, 
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    }
  }],
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }]
});

AdminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  next();
});

AdminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign({ _id: admin._id }, "jwtSecret");
  admin.tokens = admin.tokens.concat({ token });
  await admin.save();
  return token;
};

AdminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await admin.findOne({ email });
  if (!admin) {
    throw new Error("Please enter authorized email");
  }
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error("Password is not matched");
  }
  return admin;
};

const Admin = mongoose.model("admins", AdminSchema)

module.exports = Admin