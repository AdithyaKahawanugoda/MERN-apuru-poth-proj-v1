const express = require("express");
const router = express.Router();
const Address = require("../models/");

// @url           /customer/update/address/:id
// @description   update quantity
 
router.put("/update/address/:id", async (req, res) => {
    const Id = req.params.id;
    try {
      const {address} = req.body;
      const updateAdd = {
      address:address,
      };
      const updateAddress = await Address.findByIdAndUpdate(Id, updateAdd);
      res.status(200).send({ status: "address updated", add: updateAddress });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  module.exports = router;