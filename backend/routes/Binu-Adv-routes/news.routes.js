const express = require("express");
const router = express.Router();
const Newsletter = require("../models/news.model");

// @url           /admin/news/create
// @description   create new News letter
// @Action        public
router.post("/create", async (req, res) => {
  try {
    
    const { topic, date, content } = req.body;
    const dbNews = {
      topic: topic,
      createDate: date,
      content: content,
    };

    const newNews = new Newsletter(dbNews);
    await newNews.save();
    res.status(200).send({ status: "News letter   Created", newsletter: newNews });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
});

// @url           admin/news/all
// @description   return all newsletters in database
// @Action        public
router.get("/all", async (req, res) => {
  try {
    const news = await Newsletter.find({});
    res.status(200).send({ status: "newsletter fetched", newsletter: news });
  } catch (error) {
    res.status(500).send({ status: "Error with /all", error: error.message });
  }
});

// @url           admin/news/one/:id
// @description   return newsletter by id
// @Action        public
router.get("/one/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await Newsletter.findById(newsId);
    res.status(200).send({ status: "Newsletter fetched", newsletter: news });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error with /one/:id", error: error.message });
  }
});

// @url           admin/news/update/:id
// @description   update newsletter by id
// @Action        private
router.post("/update/:id", async (req, res) => {
  const Id = req.params.id;
  try {
    const { topic, date, content } = req.body;
    const updateValues = {
      topic: topic,
      createDate: date,
      content: content,
    };
    const updateNewsletter = await Newsletter.findByIdAndUpdate(Id, updateValues);
    res.status(200).send({ status: "Newsletter updated", user: updateNewsletter });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// @url           admin/news/delete/:id
// @description   delete newsletter by id
// @Action        private
router.delete("/delete/:id", async (req, res) => {
  const newsID = req.params.id;
  try {
    const deleteNewsletter = await Newsletter.findByIdAndDelete(newsID);
    res.status(200).send({ status: "newsletter deleted", user: deleteNewsletter });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error with /delete/:id", error: error.message });
  }
});


module.exports = router;