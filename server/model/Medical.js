const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicalSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  about: {
    type: String,
  },
});

// maybe add a user object with a ref to therapist.
module.exports = Post = mongoose.model('medical', MedicalSchema);
