import React from 'react';
import { Link } from 'react-router-dom';
import StyledContainer from '../components/ui/StyledContainer';
import StyledCard from '../components/ui/StyledCard';
import RoutableButton from '../components/ui/RoutableButton';

const Home = () => {
  return (
    <StyledContainer fullHeight>
      <div style={{textAlign: 'center', padding: '40px 0'}}>
        <h1 style={{color: '#4361ee', marginBottom: '20px', fontSize: '2.5rem'}}>
          Добро пожаловать в HabitTracker
        </h1>
        <p style={{fontSize: '1.2rem', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px'}}>
          Приложение для формирования полезных привычек и отслеживания вашего прогресса
        </p>

        <StyledCard style={{maxWidth: '800px', margin: '0 auto'}}>
          <div style={{display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap'}}>
            <div style={{flex: 1, minWidth: '250px'}}>
              <h3>📊 Отслеживание</h3>
              <p>Фиксируйте свои ежедневные привычки и наблюдайте за прогрессом</p>
            </div>
            <div style={{flex: 1, minWidth: '250px'}}>
              <h3>📅 Календарь</h3>
              <p>Просматривайте свою активность за любой период</p>
            </div>
            <div style={{flex: 1, minWidth: '250px'}}>
              <h3>🏆 Мотивация</h3>
              <p>Получайте достижения за последовательность</p>
            </div>
          </div>

          <div style={{marginTop: '40px', display: 'flex', justifyContent: 'center'}}>
            <RoutableButton to="/register" primary>
              Начать сейчас
            </RoutableButton>
          </div>
        </StyledCard>
      </div>
    </StyledContainer>
  );
};

export default Home;
