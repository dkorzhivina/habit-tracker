import React from 'react';
import RoutableButton from './ui/RoutableButton';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <RoutableButton 
        to="/" 
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#4361ee',
          textDecoration: 'none',
          background: 'none',
          padding: 0
        }}
      >
        HabitTracker
      </RoutableButton>
      
      <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
        {user ? (
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            {/* Кнопка профиля */}
            <RoutableButton 
              to="/account" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: '#4361ee',
                background: '#f8f9fa',
                padding: '8px 12px',
                borderRadius: '20px'
              }}
            >
              <span style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#4361ee',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}>
               {user.username?.charAt(0).toUpperCase() ?? '👤'}
              </span>
              <span>Аккаунт</span>
            </RoutableButton>

            {/* Кнопка выхода */}
            <RoutableButton 
              onClick={logout} 
              style={{
                color: '#ef233c',
                background: '#f8f9fa',
                padding: '8px 12px',
                borderRadius: '20px'
              }}
            >
              Выйти
            </RoutableButton>
          </div>
        ) : (
          <RoutableButton to="/login">
            Войти
          </RoutableButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;