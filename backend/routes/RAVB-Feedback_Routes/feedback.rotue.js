const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/HSKI-User/user.model");
const Product = require("../../models/ADI-Product_and_Invoice/product-model");
const Feedback = require("../../models/RAVB-Feedback_Model/feedback.model")

// @url           POST /feedback/create
// @description   create new user feedback
// @Action        private
router.post("/create/:productId", auth, async (req, res) => {
  let productId = req.params.productId;
  let { rating, comment } = req.body;
  let date = new Date();

  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      throw new Error("There is no user");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("There is no product");
    }

    let feedback = {
      productId: productId,
      userId: req.user.id,
      userPicture: req.user.profilePicture,
      userName: req.user.name,
      rating: rating,
      comment: comment,
      date: date.toISOString().slice(0,10)
    };

    const newFeedback = new Feedback(feedback);

    await newFeedback.save().then(async () => {
      let feedbackCollection = await Feedback.find({ productId: productId });
      let number = 0;
      let feedbackCount = feedbackCollection.length;
      let totalRating = 0;

      if (feedbackCollection.length != 0) {
        for (number; number < feedbackCollection.length; number++) {
          totalRating = totalRating + feedbackCollection[number].rating;
        }
        let average = totalRating / feedbackCount;
        let averageRating = Math.round(average * 10) / 10;
        console.log(averageRating);
        await Product.findOneAndUpdate(
          { _id: productId },
          { averageRating: averageRating }
        );
      } else {
        let average = (totalRating + rating) / feedbackCount;
        let averageRating = Math.round(average * 10) / 10;
        console.log(averageRating);
        await Product.findOneAndUpdate(
          { _id: productId },
          { averageRating: averageRating }
        );
      }
    });
    res.status(200).send({ status: "Feedback Added", feedbacks: newFeedback });
  } catch (err) {
    res
      .status(500)
      .send({ status: "Error with insert Feedback", error: err.message });
    console.log(err);
  }
});

// @url           GET /feedback/read/:id
// @description   display all feedbacks of a product
// @Action        public
router.get("/read/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    let number = 0;
    let one = 0,
      oneAndHalf = 0;
    let two = 0,
      twoAndHalf = 0;
    let three = 0,
      threeAndHalf = 0;
    let four = 0,
      fourAndHalf = 0;
    let five = 0;
    // validate product
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("There is no product");
    }

    const feedbacks = await Feedback.find({productId: productId})

    for (number; number < feedbacks.length; number++) {
      switch (feedbacks[number].rating) {
        case 1:
          one++;
          break;
        case 1.5:
          oneAndHalf++;
          break;
        case 2:
          two++;
          break;
        case 2.5:
          twoAndHalf++;
          break;
        case 3:
          three++;
          break;
        case 3.5:
          threeAndHalf++;
          break;
        case 4:
          four++;
          break;
        case 4.5:
          fourAndHalf++;
          break;
        case 5:
          five++;
          break;
      }
    }
    const ratings = {
      one: one,
      oneAndHalf: oneAndHalf,
      two: two,
      twoAndHalf: twoAndHalf,
      three: three,
      threeAndHalf: threeAndHalf,
      four: four,
      fourAndHalf: fourAndHalf,
      five: five,
      ratings: feedbacks.length,
    };
    //console.log(ratings);
    res.status(200).send({ feedbacks: feedbacks, ratings: ratings });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error with read Feedbacks", error: error.message });
    console.log(error);
  }
});

// @url           PUT /feedback/update/:id
// @description   update feedback details by id
// @Action        private
router.put("/update/:productId/:feedbackId", auth, async (req, res) => {
  const productId = req.params.productId;
  const feedbackId = req.params.feedbackId;
  const { rating, comment } = req.body;

  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      throw new Error("There is no user");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("There is no product");
    }

    const updateFeedbck = await Feedback.findOneAndUpdate(
      { _id: feedbackId },
      { rating: rating, comment: comment }
    ).then(async () => {
      let feedbackCollection = await Feedback.find({ productId: productId });
      let number = 0;
      let feedbackCount = feedbackCollection.length;
      let totalRating = 0;

      if (feedbackCollection.length != 0) {
        for (number; number < feedbackCollection.length; number++) {
          totalRating = totalRating + feedbackCollection[number].rating;
        }
        let average = totalRating / feedbackCount;
        let averageRating = Math.round(average * 10) / 10;
        console.log(averageRating);
        await Product.findOneAndUpdate(
          { _id: productId },
          { averageRating: averageRating }
        );
      } else {
        let average = (totalRating + rating) / feedbackCount;
        let averageRating = Math.round(average * 10) / 10;
        console.log(averageRating);
        await Product.findOneAndUpdate(
          { _id: productId },
          { averageRating: averageRating }
        );
      }
    });
    res
      .status(200)
      .send({ status: "Feedback Updated", feedbacks: updateFeedbck });
  } catch (err) {
    res
      .status(500)
      .send({ status: "Error with update Feedback", error: err.message });
  }
});

// @url           DELETE /feedback/delete/:productId/:feedbackId
// @description   delete feedback details by id
// @Action        private
router.delete('/delete/:productId/:feedbackId', auth, async (req, res) => {
  const productId = req.params.productId;
  const feedbackId = req.params.feedbackId;

  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      throw new Error("There is no user");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("There is no product");
    }

    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      throw new Error("There is no feedback");
    }

    const deleteFeedback = await Feedback.findByIdAndDelete(feedbackId).then(async () => {
      let feedbackCollection = await Feedback.find({ productId: productId });
      let number = 0;
      let feedbackCount = feedbackCollection.length;
      let totalRating = 0;

      if (feedbackCollection.length != 0) {
        for (number; number < feedbackCollection.length; number++) {
          totalRating = totalRating + feedbackCollection[number].rating;
        }
        let average = totalRating / feedbackCount;
        let averageRating = Math.round(average * 10) / 10;
        console.log(averageRating);
        await Product.findOneAndUpdate(
          { _id: productId },
          { averageRating: averageRating }
        );
      } else {
        let average = (totalRating + rating) / feedbackCount;
        let averageRating = Math.round(average * 10) / 10;
        console.log(averageRating);
        await Product.findOneAndUpdate(
          { _id: productId },
          { averageRating: averageRating }
        );
      }
    })
    res
    .status(200)
    .send({ status: "Feedback Deleted", feedbacks: deleteFeedback });
  } catch (err) {
    res
      .status(500)
      .send({ status: "Error with delete Feedback", error: err.message });
  }
})

module.exports = router;
