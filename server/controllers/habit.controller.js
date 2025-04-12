exports.updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Добавляем проверку владельца
    
    const habit = await Habit.findOne({ 
      where: { 
        id, 
        UserId: userId // Проверяем, что привычка принадлежит пользователю
      } 
    });

    if (!habit) {
      return res.status(404).json({ message: 'Привычка не найдена или у вас нет прав на её редактирование' });
    }

    // Разрешаем обновлять только определенные поля
    const { name, description, frequency, goal, color, CategoryId } = req.body;
    
    const updatedHabit = await habit.update({
      name: name || habit.name,
      description: description !== undefined ? description : habit.description,
      frequency: frequency || habit.frequency,
      goal: goal || habit.goal,
      color: color || habit.color,
      CategoryId: CategoryId || habit.CategoryId
    });

    res.json(updatedHabit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};