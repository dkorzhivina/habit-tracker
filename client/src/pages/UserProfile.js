import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StyledContainer from '../components/ui/StyledContainer';
import StyledCard from '../components/ui/StyledCard';
import Habits from './Habits';
import RoutableButton from '../components/ui/RoutableButton';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const UserProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('habits');
  const [date, setDate] = useState(new Date());
  
  // Пример данных для статистики (замените на реальные данные из API)
  const statsData = {
    habitsCompleted: 42,
    habitsTotal: 60,
    streak: 7,
    monthlyData: [
      { name: 'Янв', completed: 5, total: 10 },
      { name: 'Фев', completed: 8, total: 12 },
      { name: 'Мар', completed: 10, total: 15 },
      { name: 'Апр', completed: 7, total: 10 },
    ],
    habitsByCategory: [
      { name: 'Спорт', value: 15 },
      { name: 'Здоровье', value: 10 },
      { name: 'Обучение', value: 8 },
      { name: 'Работа', value: 7 },
    ],
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Форматирование даты в YYYY-MM-DD
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
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
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
            <Calendar
              onChange={setDate}
              value={date}
              minDetail="year"
              locale="ru-RU"
            />
          </div>
        )}

        {activeTab === 'stats' && (
          <div style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '30px', textAlign: 'center' }}>Статистика выполнения привычек</h3>
            
            {/* Общая статистика */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              marginBottom: '40px',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <StatCard 
                title="Выполнено" 
                value={`${statsData.habitsCompleted}/${statsData.habitsTotal}`}
                subtitle="привычек"
              />
              <StatCard 
                title="Процент" 
                value={`${Math.round((statsData.habitsCompleted / statsData.habitsTotal) * 100)}%`}
                subtitle="успеха"
              />
              <StatCard 
                title="Стрик" 
                value={statsData.streak}
                subtitle="дней подряд"
              />
            </div>

            {/* График по месяцам */}
            <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Выполнение по месяцам</h4>
            <div style={{ height: '300px', marginBottom: '40px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statsData.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#8884d8" name="Выполнено" />
                  <Bar dataKey="total" fill="#82ca9d" name="Всего" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Круговой график по категориям */}
            <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Распределение по категориям</h4>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statsData.habitsByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statsData.habitsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </StyledCard>
    </StyledContainer>
  );
};

// Компонент для отображения статистической карточки
const StatCard = ({ title, value, subtitle }) => (
  <div style={{
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '20px',
    minWidth: '150px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  }}>
    <div style={{ fontSize: '16px', color: '#6c757d' }}>{title}</div>
    <div style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>{value}</div>
    <div style={{ fontSize: '14px', color: '#6c757d' }}>{subtitle}</div>
  </div>
);

export default UserProfile;