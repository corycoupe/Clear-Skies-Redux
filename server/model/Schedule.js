const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  date: {
    type: Date,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  zoomcall: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema);

// This might go here eventually
// therapistuser: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'therapist',
// },
