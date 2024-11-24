var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// Telling the router that I have this model
let Workout = require('../model/workout.js');
const workout = require('../model/workout.js');
let workoutController = require('../controllers/workout.js');

/* Read Operation --> Get route for displaying the workout list */
router.get('/', async (req, res, next) => {
  try {
    const WorkoutList = await Workout.find();
    res.render('Workout/list', {
      title: 'Runs', // Updated name to "Runs"
      WorkoutList: WorkoutList
    });
  } catch (err) {
    console.error(err);
    res.render('Workout/list', {
      error: 'Error on the server'
    });
  }
});

/* Create Operation --> Get route for displaying the Add Run page */
router.get('/add', async (req, res, next) => {
  try {
    res.render('Workout/add', {
      title: 'Add Run' // Updated title to "Add Run"
    });
  } catch (err) {
    console.error(err);
    res.render('Workout/list', {
      error: 'Error on the server'
    });
  }
});

/* Create Operation --> Post route for processing the Add Run page */
router.post('/add', async (req, res, next) => {
  try {
    let newWorkout = Workout({
      distance: req.body.distance, // Updated name to "distance"
      duration: req.body.duration,
      date: req.body.date,
      notes: req.body.notes
    });
    Workout.create(newWorkout).then(() => {
      res.redirect('/workouts');
    });
  } catch (err) {
    console.error(err);
    res.render('Workout/list', {
      error: 'Error on the server'
    });
  }
});

/* Update Operation --> Get route for displaying the Edit Run page */
router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const workoutToEdit = await Workout.findById(id);
    res.render('Workout/edit', {
      title: 'Edit Run', // Updated title to "Edit Run"
      Workout: workoutToEdit
    });
  } catch (err) {
    console.error(err);
    next(err); // Passing the error
  }
});

/* Update Operation --> Post route for processing the Edit Run page */
router.post('/edit/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let updatedWorkout = Workout({
      _id: id,
      distance: req.body.distance, // Updated name to "distance"
      duration: req.body.duration,
      date: req.body.date,
      notes: req.body.notes
    });
    Workout.findByIdAndUpdate(id, updatedWorkout).then(() => {
      res.redirect('/workouts');
    });
  } catch (err) {
    console.error(err);
    res.render('Workout/list', {
      error: 'Error on the server'
    });
  }
});

/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    Workout.deleteOne({ _id: id }).then(() => {
      res.redirect('/workouts');
    });
  } catch (err) {
    console.error(err);
    res.render('Workout/list', {
      error: 'Error on the server'
    });
  }
});

module.exports = router;
