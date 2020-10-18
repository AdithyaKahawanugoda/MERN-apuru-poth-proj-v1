const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address_line_1: {
    type: String,
    required: true,
    trim: true,
  },
  address_line_2: {
    type: String,
    required: false,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  area_province: {
    type: String,
    required: true,
    trim: true,
  },
  postal_code: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    maxlength: 10,
    trim: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Please enter valid mobile number");
      }
    },
  },
  DOB: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please enter valid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  cart: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "products"
    },
    productName: {
      type: String,
      require: true
    },
    productPrice: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  wishList: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "products"
    },
    productName: {
      type: String,
      require: true
    },
    productPrice: {
      type: Number,
      required: true
    },
    coverImage: {
      type: Buffer,
      required: true
    }
  }],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// @Action - encrypt the password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// @Action - Get auth token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "jwtSecret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// @Action - Find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Please enter authorized email");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password is not matched");
  }
  return user;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
