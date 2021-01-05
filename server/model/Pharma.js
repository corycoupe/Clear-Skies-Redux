const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PharmaSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
  },
  dosage: {
    type: String,
  },
  type: {
    type: String,
  },
});

module.exports = Pharma = mongoose.model('pharma', PharmaSchema);
