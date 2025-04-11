const db = require('../models');
const Habit = db.habits;

exports.getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.findAll();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findByPk(req.params.id);
    if (habit) {
      res.json(habit);
    } else {
      res.status(404).json({ message: 'Habit not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createHabit = async (req, res) => {
  try {
    const habit = await Habit.create(req.body);
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const [updated] = await Habit.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedHabit = await Habit.findByPk(req.params.id);
      res.json(updatedHabit);
    } else {
      res.status(404).json({ message: 'Habit not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const deleted = await Habit.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Habit deleted' });
    } else {
      res.status(404).json({ message: 'Habit not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
