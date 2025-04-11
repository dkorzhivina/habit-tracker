import React, { useState } from 'react';
import StyledContainer from '../components/ui/StyledContainer';
import StyledCard from '../components/ui/StyledCard';
import StyledButton from '../components/ui/StyledButton';
import StyledInput from '../components/ui/StyledInput';

const Habits = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Утренняя зарядка', completed: false },
    { id: 2, name: 'Чтение книги', completed: true },
    { id: 3, name: 'Прогулка', completed: false }
  ]);
  const [newHabit, setNewHabit] = useState('');

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, {
        id: Date.now(),
        name: newHabit,
        completed: false
      }]);
      setNewHabit('');
    }
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? {...habit, completed: !habit.completed} : habit
    ));
  };

  return (
    <StyledContainer fullHeight>
      <StyledCard title="Мои привычки">
        <div style={{marginBottom: '20px'}}>
          <div style={{display: 'flex', gap: '10px'}}>
            <StyledInput
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Новая привычка"
              style={{flex: 1}}
            />
            <StyledButton primary onClick={addHabit}>
              Добавить
            </StyledButton>
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {habits.map(habit => (
            <div key={habit.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              backgroundColor: habit.completed ? '#e8f5e9' : '#fff3e0',
              borderRadius: '8px',
              borderLeft: `4px solid ${habit.completed ? '#4caf50' : '#ff9800'}`
            }}>
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabit(habit.id)}
                style={{marginRight: '10px'}}
              />
              <span style={{
                flex: 1,
                textDecoration: habit.completed ? 'line-through' : 'none',
                color: habit.completed ? '#4caf50' : '#ff9800'
              }}>
                {habit.name}
              </span>
              <StyledButton small>✏️</StyledButton>
              <StyledButton small style={{marginLeft: '5px'}}>🗑️</StyledButton>
            </div>
          ))}
        </div>
      </StyledCard>
    </StyledContainer>
  );
};

export default Habits;
