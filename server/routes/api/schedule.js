const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../model/User');
const Schedule = require('../../model/Schedule');

// @route       POST api/schedule
// @desc        Create a schedule
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('from', 'From field is required').not().isEmpty(),
      check('to', 'To field is required').not().isEmpty(),
      check('zoomcall', 'zoomcall field is required').not().isEmpty(),
      check('name', 'name field is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const newSchedule = new Schedule({
        date: req.body.date,
        from: req.body.from,
        to: req.body.to,
        zoomcall: req.body.zoomcall,
        name: user.name,
        user: req.user.id,
      });
      const schedule = await newSchedule.save();
      res.json(schedule);
    } catch (err) {
      console.error(err.message);
      console.log(err);
      res.status(500).send('Server Error');
    }
  }
);

// @route       GET api/schedule/:id
// @desc        Get schedules from specific user
// @access      Private
router.get('/:user_id', auth, async (req, res) => {
  try {
    const schedule = await Schedule.find({
      user: req.params.user_id,
    })
      .sort({ date: 1 })
      .populate('user');
    if (!schedule) {
      return res.status(404).json({ msg: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    console.log(err);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Schedule not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/schedule/:id
// @desc        Delete Schedule from specific user
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // req.params.id is grabbed from the URL
    const schedule = await Schedule.findById(req.params.id);

    // Post doesn't exist
    if (!schedule) {
      return res.status(404).json({ msg: 'Schedule not found' });
    }
    //Check User
    if (schedule.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await schedule.remove();

    res.json({ msg: 'Schedule deleted' });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Schedule not Found' });
    }
    console.error(err.message);
    console.log(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
