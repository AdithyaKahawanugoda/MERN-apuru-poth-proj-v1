const express = require("express");
const router = express.Router();
const Request = require('../../models/NITH-RequestBook/request.model');
const auth = require('../../middleware/auth.js')
const User = require('../../models/HSKI-User/user.model.js')

//url    request/add
//description  create new request book
//@Action  public
router.post("/add",auth, async (req, res) => {
    try {
      let userId = req.user.id
      const user = await User.findById(userId)
      if (!user) {
        throw new Error('There is no user')
      }
     
      const { bookName, authorName, printedYear, userEmail } = req.body;

      const dbRequest = {
        bookName: bookName,
        authorName: authorName,
        printedYear: printedYear,
        userID: userId,
        userName: req.user.name,
        userEmail: userEmail,
        profileImage: req.user.profilePicture
      };
  
      const newRequest = new Request(dbRequest);
      await newRequest.save();
      res.status(200).send({ status: "New request created", request: newRequest });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: error.message });
    }
  });

  // @url           /request/all
// @description   return all requests in database
// @Action        public
router.get("/all", async (req, res) => {
  try {
    const requests = await Request.find({});
    res.status(200).send({requests: requests});
  } catch (error) {
    res.status(500).send({ status: "Error with /all", error: error.message });
  }
});

router.get('/myrequests', auth, async (req, res) => {
  try {
    const userRequest = await Request.find({userID: req.user.id})
    res.status(200).send({requests: userRequest})
  } catch (error) {
    res.status(500).send({ status: "Error with /myrequests", error: error.message });
  }
})

// @url           /request/update/:id
// @description   update request by id
// @Action        private
router.post("/update/:id", async (req, res) => {
  const Id = req.params.id;
  try {
    const { bookname, authorname, printedyear, userid, email } = req.body;
    const updateValues = {
        bookName: bookname,
        authorName: authorname,
        printedYear: printedyear,
        userId: userid,
        userEmail: email,
    };
    const updateRequest = await Request.findByIdAndUpdate(Id, updateValues);
    res.status(200).send({ status: "Request updated", request: updateRequest });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// @url           /request/delete/:id
// @description   delete request by id
// @Action        private
router.delete("/delete/:id", async (req, res) => {
  const reqID = req.params.id;
  try {
    const deleteRequest = await Request.findByIdAndDelete(reqID);
    res.status(200).send({ status: "Request deleted", request: deleteRequest });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error with /delete/:id", error: error.message });
  }
});
  
module.exports = router