const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const request = require('request');
const config = require('config');
const { check, validationResult } = require('express-validator');
const Medical = require('../../model/Medical');
const Schedule = require('../../model/Schedule');
const User = require('../../model/User');
const { json } = require('express');
// @route       GET api/medical/me
// @desc        Get current logged in User's Medical
// @access      Public
router.get('/me', auth, async (req, res) => {
  try {
    const medical = await Medical.findOne({ user: req.user.id }).populate(
      'user'
    );
    if (!medical) {
      return res.status(400).json({ msg: 'there is no profile for this user' });
    }
    res.json(medical);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route       POST api/medical
// @desc        Create or Update a user profile
// @access      Private

router.post('/', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { location, about } = req.body;
  const medicalFields = {};
  medicalFields.user = req.user.id;
  if (location) medicalFields.location = location;
  if (about) medicalFields.about = about;

  try {
    let medical = await Medical.findOne({ user: req.user.id });

    // Update
    if (medical) {
      medical = await Medical.findOneAndUpdate(
        { user: req.user.id },
        { $set: medicalFields },
        { new: true }
      );
      return res.json(medical);
    }
    //Create
    medical = new Medical(medicalFields);
    await medical.save();
    res.json(medical);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route       DELETE api/medical/user/:user_id
// @desc        DELETE profile user and post
// @access      Private
router.delete('/', auth, async (req, res) => {
  try {
    // remove user posts
    await Schedule.deleteMany({ user: req.user.id });
    // remove profile
    await Medical.findOneAndRemove({ user: req.user.id });
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'user removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
