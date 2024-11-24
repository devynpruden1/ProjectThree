const mongoose = require('mongoose');

let workoutModel = mongoose.Schema(
  {
    distance: { type: Number, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
    notes: { type: String },
  },
  {
    collection: 'Workouts' // This must match the target collection name
  }
);

module.exports = mongoose.model('Workout', workoutModel);
