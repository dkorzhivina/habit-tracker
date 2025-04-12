const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habit.controller');
const authMiddleware = require('../middleware/auth');

// Защищаем все роуты авторизацией
router.use(authMiddleware);

router.get('/', habitController.getAllHabits);
router.get('/:id', habitController.getHabitById);
router.post('/', habitController.createHabit);
router.put('/:id', habitController.updateHabit);
router.delete('/:id', habitController.deleteHabit);

module.exports = router;