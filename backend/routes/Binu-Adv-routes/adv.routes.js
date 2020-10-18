const express = require("express");
const router = express.Router();
const Advertisement = require("../../models/Binu-Adv-models/adv.model");
//image
const multer = require('multer');
const sharp =require('sharp');

const image = multer({
    limits: {
      
      fileSize: 4000000,
    },
    fileFilter(req,file,cb){
      if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb(new error("File is not supported"));

      }
      cb(undefined, true);
    },

});


// @url           /admin/advertisement/add
// @description   create new advertisement
// @Action        public
router.post("/add",image.single("pic"), async (req, res) => {
  try {
    const picture =await sharp(req.file.buffer)
    .resize({width :300 ,height :300})
    .png()
    .toBuffer();
    
    const { title, pdate, text} = req.body;
    const dbAdv = {
      title: title,
      publisheddate: pdate,
      text: text,
      image:picture,
    };

    const newAdv = new Advertisement(dbAdv);
    await newAdv.save();
    res.status(200).send({ status: "Advertisement  Created", advertisement: newAdv });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
});

// @url           admin/advertisement/all
// @description   return all advertisements in database
// @Action        public
router.get("/all", async (req, res) => {
  try {
    const adv = await Advertisement.find({});
    res.status(200).send({ status: "advertisements fetched", advertisement: adv });
  } catch (error) {
    res.status(500).send({ status: "Error with /all", error: error.message });
  }
});

// @url           admin/advertisement/one/:id
// @description   return advertisement by id
// @Action        public
router.get("/one/:id", async (req, res) => {
  try {
    const advId = req.params.id;
    const adver = await Advertisement.findById(advId);
    res.status(200).send({ status: "advertisement fetched", advertisement: adver });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error with /one/:id", error: error.message });
  }
});

// @url           admin/advertisement/update/:id
// @description   update advertisement by id
// @Action        private
router.post("/update/:id", async (req, res) => {
  const AId = req.params.id;
  try {
    const { title, pdate, text } = req.body;
    const updateAValues = {
      title: title,
      publisheddate: pdate,
      text: text,
    };
    const updateAdvertisement = await Advertisement.findByIdAndUpdate(AId, updateAValues);
    res.status(200).send({ status: "Advertisement updated", advertisement: updateAdvertisement });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// @url           admin/advertisement/delete/:id
// @description   delete advertisement by id
// @Action        private
router.delete("/delete/:id", async (req, res) => {
  const advID = req.params.id;
  try {
    const deleteAdvertisement = await Advertisement.findByIdAndDelete(advID);
    res.status(200).send({ status: "advertisement deleted", advertisement: deleteAdvertisement });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error with /delete/:id", error: error.message });
  }
});


module.exports = router;