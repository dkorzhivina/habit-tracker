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
            <span style={{fontWeight: 'bold'}}>{user.username}</span>
            <RoutableButton onClick={logout} style={{color: '#ef233c'}}>
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
