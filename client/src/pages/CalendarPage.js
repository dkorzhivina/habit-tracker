import { useState, useEffect, useContext } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';  
import api from '../utils/api';

const CalendarPage = () => {
  const [habits, setHabits] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchHabits();
    }
  }, [isAuthenticated, currentDate]);
  
  const fetchHabits = async () => {
    try {
      const res = await api.get('/api/habits');
      setHabits(res.data);
    } catch (err) {
      toast.error('Failed to fetch habits');
    }
  };
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const getHabitsForDay = (day) => {
    return habits.filter(habit => 
      habit.completions.some(completion => 
        isSameDay(new Date(completion.date), day)
      )
    ); 
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Habit Calendar</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={prevMonth}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-xl font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button 
            onClick={nextMonth}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map(day => {
          const dayHabits = getHabitsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <div 
              key={day.toString()}
              className={`min-h-24 p-2 border rounded ${isCurrentMonth ? 'bg-white' : 'bg-gray-100'}`}
            >
              <div className="text-right mb-1">
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayHabits.map(habit => (
                  <div 
                    key={habit._id}
                    className="text-xs p-1 rounded truncate"
                    style={{ backgroundColor: `${habit.color}20`, borderLeft: `3px solid ${habit.color}` }}
                  >
                    {habit.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarPage;