import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StyledContainer from '../components/ui/StyledContainer';
import StyledCard from '../components/ui/StyledCard';
import Habits from './Habits';
import RoutableButton from '../components/ui/RoutableButton';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css'; 

const UserProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('habits');
  const [date, setDate] = useState(new Date());
  const [habitsMarked, setHabitsMarked] = useState({
    // Пример данных: дни, когда привычки были выполнены
    '2025-01-15': true,
    '2025-02-20': true,
    '2025-03-10': true,
  });

  // Форматирование даты в YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Пользовательское содержимое для ячеек календаря
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = formatDate(date);
      return habitsMarked[dateStr] ? (
        <div className="habit-marker">✓</div>
      ) : null;
    }
    return null;
  };

  // Подсветка дней с выполненными привычками
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = formatDate(date);
      return habitsMarked[dateStr] ? 'highlight-day' : '';
    }
    return '';
  };

  return (
    <StyledContainer fullHeight>
      <StyledCard title={`Категории ${user?.username || ''}`}>
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          borderBottom: '1px solid #eee',
          paddingBottom: '10px'
        }}>
          <RoutableButton 
            primary={activeTab === 'habits'}
            onClick={() => setActiveTab('habits')}
          >
            Мои привычки
          </RoutableButton>
          <RoutableButton 
            primary={activeTab === 'calendar'}
            onClick={() => setActiveTab('calendar')}
          >
            Календарь
          </RoutableButton>
          <RoutableButton 
            primary={activeTab === 'stats'}
            onClick={() => setActiveTab('stats')}
          >
            Статистика
          </RoutableButton>
        </div>

        {activeTab === 'habits' && <Habits />}
        
        {activeTab === 'calendar' && (
          <div style={{
            padding: '20px',
            borderRadius: '8px',
            minHeight: '300px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Calendar
              onChange={setDate}
              value={date}
              tileContent={tileContent}
              tileClassName={tileClassName}
              minDetail="year"
              maxDetail="month"
              calendarType="gregory"
              locale="ru-RU"
              next2Label={null}
              prev2Label={null}
              showNeighboringMonth={false}
            />
          </div>
        )}

        {activeTab === 'stats' && (
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px',
            minHeight: '300px'
          }}>
            <h3>Статистика</h3>
          </div>
        )}
      </StyledCard>
    </StyledContainer>
  );
};

export default UserProfile;