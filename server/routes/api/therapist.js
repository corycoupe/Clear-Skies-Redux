const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');
// placing Userdatabase in variable
const User = require('../../model/Therapist');

// @route       POST api/therapist
// @desc        Register User
// @access      Public
router.post(
  '/',
  // validation methods (check) must be in brackets

  [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check(
      'password',
      'Please enter a Password with six or more characters'
    ).isLength({ min: 6 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      profession,
      image,
      imagecard,
      telephone,
      city,
      address,
      postal,
    } = req.body;
    try {
      //See if user exists, checks if email is being used by someone else
      let therapist = await Therapist.findOne({ email });
      if (therapist) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Therapist already exists' }] });
      }

      therapist = new User({
        name,
        email,
        password,
        profession,
        image,
        imagecard,
        telephone,
        city,
        address,
        postal,
      });
      //Encrypt the password using Bcrypt
      const salt = await bcrypt.genSalt(10);

      therapist.password = await bcrypt.hash(password, salt);

      await therapist.save();
      //return jsonwebtoken
      const payload = {
        therapist: {
          id: therapist.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       GET api/therapist
// @desc        Get all therapists
// @access      Public
router.get('/', async (req, res) => {
  try {
    const therapists = await Therapist.find();
    res.json(therapists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/therapist/:id
// @desc        Get posts from specific user
// @access      Private
router.get('/:id', async (req, res) => {
  try {
    // req.params.id is grabbed from the URL
    const therapist = await Therapist.findById(req.params.id);
    if (!therapist) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(therapist);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});
module.exports = router;
