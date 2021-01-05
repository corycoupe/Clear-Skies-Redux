const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TherapistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
  },
  image: {
    type: String,
  },
  imagecard: {
    type: String,
  },
  telephone: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  postal: {
    type: String,
  },
});

// make a patients array inside of the object using the username
// make some of the objects required
module.exports = Therapist = mongoose.model('therapist', TherapistSchema);
