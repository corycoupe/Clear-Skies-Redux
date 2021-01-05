const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../model/User');
const Pharma = require('../../model/Pharma');

// @route       POST api/pharma
// @desc        Create a prescription
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name field is required').not().isEmpty(),
      check('dosage', 'Dosage field is required').not().isEmpty(),
      check('type', 'type field is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPharma = new Pharma({
        name: req.body.name,
        dosage: req.body.dosage,
        type: req.body.type,
        user: req.user.id,
      });
      const pharma = await newPharma.save();
      res.json(pharma);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       GET api/schedule/:id
// @desc        Get schedules from specific user
// @access      Private
router.get('/:user_id', auth, async (req, res) => {
  try {
    const pharma = await Pharma.find({
      user: req.params.user_id,
    }).populate('user');
    if (!pharma) {
      return res.status(404).json({ msg: 'Schedule not found' });
    }
    res.json(pharma);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Schedule not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/schedule/:id
// @desc        Delte schedules from specific user
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // req.params.id is grabbed from the URL
    const pharma = await Pharma.findById(req.params.id);

    // Post doesn't exist
    if (!pharma) {
      return res.status(404).json({ msg: 'Medication not found' });
    }
    //Check User
    if (pharma.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await pharma.remove();

    res.json({ msg: 'Medication deleted' });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Schedule not Found' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
