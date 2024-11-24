const mongoose = require('mongoose');

let workoutModel = mongoose.Schema(
  {
    distance: { type: Number, required: true }, // Distance in km
    duration: { type: Number, required: true }, // Duration in minutes
    date: { type: Date, required: true },       // Date of the run
    notes: { type: String },                   // Optional notes
  },
  {
    collection: 'Workouts' // Make sure this matches your MongoDB collection name
  }
);

module.exports = mongoose.model('Workout', workoutModel);
