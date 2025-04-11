import { useState } from 'react';
import { toast } from 'react-toastify';
import HabitForm from './HabitForm';

const HabitItem = ({ habit, onUpdate, onDelete, onComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleComplete = () => {
    onComplete(habit._id);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      onDelete(habit._id);
    }
  };
  
  const handleUpdate = async (updatedHabit) => {
    const success = await onUpdate(habit._id, updatedHabit);
    if (success) {
      setIsEditing(false);
    }
  };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayCompletion = habit.completions.find(c => 
    new Date(c.date).toISOString() === today.toISOString()
  );
  
  const completionCount = todayCompletion ? todayCompletion.count : 0;
  const isCompleted = completionCount >= habit.goal;
  
  if (isEditing) {
    return (
      <div className="p-4 rounded-lg shadow-md" style={{ backgroundColor: `${habit.color}10` }}>
        <HabitForm 
          initialData={habit}
          onAdd={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }
  
  return (
    <div 
      className="p-4 rounded-lg shadow-md relative"
      style={{ backgroundColor: `${habit.color}10`, borderLeft: `4px solid ${habit.color}` }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{habit.name}</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-gray-700"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      
      {habit.description && (
        <p className="text-gray-600 mb-3">{habit.description}</p>
      )}
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {completionCount}/{habit.goal} today
        </span>
        
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`px-3 py-1 rounded text-sm ${isCompleted 
            ? 'bg-green-100 text-green-800' 
            : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'}`}
        >
          {isCompleted ? 'Completed' : 'Complete'}
        </button>
      </div>
    </div>
  );
};

export default HabitItem;