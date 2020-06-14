const express = require('express');
const router = express.Router();
const {getCalories, getCalorie,makeCalorieDetails, changeCalorie, removeCalorie} = require('../controllers/calorie_controller');

// READ
// GET on '/calories'
// Returns all calories
router.get('/', getCalories);

// READ
// GET on '/calories/:id'
// Returns calorie with given id
router.get('/:id', getCalorie)

// CREATE
// POST on '/calories'
// creates a new calorie
router.post('/', makeCalorieDetails);

// UPDATE
// PUT on '/calories/:id'
// Update a calorie with id
router.put('/:id', changeCalorie);

// DELETE
// GET on '/calories'
// Update a calorie with id
router.delete('/:id', removeCalorie);


module.exports =router