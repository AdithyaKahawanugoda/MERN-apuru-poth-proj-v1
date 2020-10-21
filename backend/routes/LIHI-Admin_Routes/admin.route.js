const express = require("express");
const router = express.Router();
const adminAuth = require('../../middleware/admin.auth')
const Admin = require('../../models/LIHI-Admin/admin.profile.model')
const bcrypt = require("bcryptjs")

router.post('/create', async (req, res) => {
  try {
    const {name, email, phoneNumber, DOB, password, profileImage} = req.body

    let admin = await Admin.findOne({ email})
    if (admin) {
      throw new Error('Admin Account Already Exists')
    }
    admin = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      DOB: DOB,
      profileImage: profileImage,
      password: password,
      role: "admin"
    }

    const newAdmin = new Admin(admin)
    await newAdmin.save()
    const token = await newAdmin.generateAuthToken()
    res.status(200).send({admin: newAdmin, token: token, status: 'Admin Account Creation Success'})
  } catch (error) {
    res.status(500).send({error: error.message})
    console.log(error)
  }
})

router.put('/update', adminAuth, async (req, res) => {
  try {
    const {name, email, phoneNumber, profileImage} = req.body

    let admin = await Admin.findOne({ email})
    if (!admin) {
      throw new Error('There is no Admin account')
    }

    const adminUpdate = await Admin.findByIdAndUpdate(req.admin.id, 
      {name: name, email: email, phoneNumber: phoneNumber, profileImage: profileImage})

    res.status(200).send({status: 'Admin Profile Updated', admin: adminUpdate})
  } catch (error) {
    res.status(500).send({error: error.message})
    console.log(error)
  }
})

router.get('/adminprofile', adminAuth, async (req, res) => {
  try {
    res.status(200).send({admin: req.admin})
  } catch (error) {
    res.status(500).send({error: error.message})
    console.log(error)
  }
})

router.post('/adminlogin', async (req, res) => {
  try {
    const {email, password} = req.body
    const admin = await Admin.findByCredentials(email, password)
    const token = await admin.generateAuthToken()
    res.status(200).send({token: token, admin: admin})
  } catch (error) {
    res.status(500).send({ error: error.message });
    console.log(error);
  }
})

router.post('/adminlogout', adminAuth, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.admin.save();
    res.status(200).send({message: 'logout successfully'})
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
})

router.post("/logoutall", adminAuth, async (req, res) => {
  try {
    req.admin.tokens = [];
    await req.admin.save();
    res.status(200).send("Successfully logout from all devices");
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

// @ ADMIN EXPERIENCE ROUTES

router.post('/addexp', adminAuth, async (req, res) => {
  try {
    const {title, description, company, from, to} = req.body
    const admin = await Admin.findOne({_id: req.admin.id})
    if (!admin) {
      throw new Error('There is no admin')
    }

    const experience = {
      title: title,
      description: description,
      company: company,
      from: from,
      to: to,
    }

    await Admin.findOneAndUpdate(
      { email: req.admin.email },
      { $push: { experience: experience } },
      { new: true, upsert: true }
    )
    res.status(200).send({experience: experience})
  } catch (error) {
    res.status(500).send({error: error.message})
    console.log(error)
  }
})

router.put('/update-experience/:id', adminAuth, async (req, res) => {
  const expId = req.params.id
  try {
    const {title, description, company, from, to} = req.body
    const admin = await Admin.findOne({_id: req.admin.id})

    if (!admin) {
      throw new Error('There is no admin')
    }

    admin.experience.id(expId).title = title
    admin.experience.id(expId).description = description
    admin.experience.id(expId).company = company
    admin.experience.id(expId).from = from
    admin.experience.id(expId).to = to

    admin.save()
    res.status(200).send({experience:admin.experience.id(expId)});
  } catch (error) {
    res.status(500).send({error: error.message})
    console.log(error)
  }
})

router.delete('/delete-experience/:id', adminAuth, async (req, res) => {
  const expId = req.params.id
  try {
    const admin = await Admin.findOne({_id: req.admin.id})
    if (!admin) {
      throw new Error('There is no admin')
    }
    const deleteExp = await admin.experience.pull({_id: expId})
    admin.save()
    res.status(200).send({ status: 'Experience deleted', experience: deleteExp})
  } catch (error) {
    res.status(500).send({error: error.message})
    console.log(error)
  }
}) 

module.exports = router