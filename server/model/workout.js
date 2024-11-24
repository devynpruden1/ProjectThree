const mongoose = require("mongoose");

let workoutModel = mongoose.Schema({
    exercise: String,       // Name of the workout exercise
    duration: Number,       // Duration in minutes
    date: Date,             // Date of the workout
    notes: String           // Optional notes about the workout
},
{
    collection: "Workouts"  // Collection name in MongoDB
});

module.exports = mongoose.model('Workout', workoutModel);
