import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StyledContainer from '../components/ui/StyledContainer';
import StyledCard from '../components/ui/StyledCard';
import Habits from './Habits';
import RoutableButton from '../components/ui/RoutableButton';

const UserProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('habits');

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
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px',
            minHeight: '300px'
          }}>
            <h3>Календарь привычек</h3>
            {/* Calendar component will be added here */}
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
            {/* Stats component will be added here */}
          </div>
        )}
      </StyledCard>
    </StyledContainer>
  );
};

export default UserProfile;