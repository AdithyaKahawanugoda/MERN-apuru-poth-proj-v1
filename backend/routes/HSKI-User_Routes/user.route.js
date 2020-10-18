const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const upload = require("../../middleware/image.upload.middleware");
const sharp = require("sharp");
const User = require("../../models/HSKI-User/user.model");
const Product = require("../../models/ADI-Product_and_Invoice/product-model");
const bcrypt = require("bcryptjs");

// @url           POST /user/signup
// @description   create new user
// @Action        public
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      add1,
      add2,
      city,
      area,
      pscode,
      country,
      phone,
      DOB,
      email,
      pwd,
      imageUrl
    } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    user = {
      name: name,
      address_line_1: add1,
      address_line_2: add2,
      city: city,
      area_province: area,
      postal_code: pscode,
      country: country,
      phoneNumber: phone,
      DOB: DOB,
      email: email,
      password: pwd,
      profilePicture: imageUrl,
    };

    const newUser = new User(user);
    await newUser.save();
    const token = await newUser.generateAuthToken();
    res
      .status(201)
      .send({ status: "User Created", user: newUser, token: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
});

// @url           GET /user/profile
// @description   get user profile
// @Action        private
router.get("/profile", auth, async (req, res) => {
  try {
    const image = Buffer.from(req.user.profilePicture).toString("base64");

    res
      .status(201)
      .send({ status: "User fetched", user: req.user, profilePicture: image });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error with /profile", error: error.message });
  }
});

// @url           PUT /user/update/:id
// @description   update user by id
// @Action        private
router.put(
  "/update/:id",
  auth,
  upload.single("profilePic"),
  async (req, res) => {
    const Id = req.params.id;

    const profilePicture = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    const {
      name,
      add1,
      add2,
      city,
      area,
      pscode,
      country,
      phone,
      DOB,
      email,
      password,
    } = req.body;

    // Encrypt the passowrd
    const hashpassword = await bcrypt.hash(password, 8);

    try {
      const updateValues = {
        name: name,
        address_line_1: add1,
        address_line_2: add2,
        city: city,
        area_province: area,
        postal_code: pscode,
        country: country,
        phoneNumber: phone,
        DOB: DOB,
        email: email,
        password: hashpassword,
        profilePicture: profilePicture,
      };

      const updateUser = await User.findByIdAndUpdate(Id, updateValues);
      res.status(200).send({ status: "User updated", user: updateUser });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

// @url           DELETE /user/delete/:id
// @description   delete user profile by id
// @Action        private
router.delete("/delete/:id", auth, async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      throw new Error("There is no user to delete");
    }
    const deleteProfile = await User.findByIdAndDelete(userID);
    res.status(200).send({ status: "user deleted", user: deleteProfile });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error with /delete/:id", error: error.message });
  }
});

// @route         POST user/login
// @description   Delete user profile
// @access        Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ status: "Login Success", token: token, user: user });
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error.message);
  }
});

// @route         POST user/logout
// @description   Logout from the system
// @access        Private
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send("Logout successfully");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// @route         POST user/logoutall
// @description   Logout from all the devices
// @access        Private
router.post("/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send("Successfully logout from all devices");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

module.exports = router;
