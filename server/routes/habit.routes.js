const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit.controller');

router.get('/', habitController.getAllHabits);
router.get('/:id', habitController.getHabitById); 
router.post('/', habitController.createHabit);
router.put('/:id', habitController.updateHabit);
router.delete('/:id', habitController.deleteHabit);

module.exports = router;
