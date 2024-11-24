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
      title: 'Workouts',
      WorkoutList: WorkoutList
    });
  } catch (err) {
    console.error(err);
    res.render('Workout/list', {
      error: 'Error on the server'
    });
  }
});

/* Create Operation --> Get route for displaying the Add Workout page */
router.get('/add', async (req, res, next) => {
  try {
    res.render('Workout/add', {
      title: 'Add Workout'
    });
  } catch (err) {
    console.error(err);
    res.render('Workout/list', {
      error: 'Error on the server'
    });
  }
});

/* Create Operation --> Post route for processing the Add Workout page */
router.post('/add', async (req, res, next) => {
  try {
    let newWorkout = Workout({
      exercise: req.body.exercise,
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

/* Update Operation --> Get route for displaying the Edit Workout page */
router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const workoutToEdit = await Workout.findById(id);
    res.render('Workout/edit', {
      title: 'Edit Workout',
      Workout: workoutToEdit
    });
  } catch (err) {
    console.error(err);
    next(err); // Passing the error
  }
});

/* Update Operation --> Post route for processing the Edit Workout page */
router.post('/edit/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let updatedWorkout = Workout({
      _id: id,
      exercise: req.body.exercise,
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
