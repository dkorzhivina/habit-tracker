import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StyledContainer from '../components/ui/StyledContainer';
import StyledCard from '../components/ui/StyledCard';
import RoutableButton from '../components/ui/RoutableButton';
import SubmitButton from '../components/ui/SubmitButton';
import StyledInput from '../components/ui/StyledInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const result = await login({ email, password });
      if (result.success) {
        navigate('/profile');
      } else {
        // Force all errors to Russian
        const russianErrors = {
          'Invalid credentials': 'Неверные учетные данные',
          'User not found': 'Пользователь не найден',
          'Login failed': 'Ошибка входа'
        };
        setError(russianErrors[result.error] || 'Ошибка входа');
      }
    } catch (err) {
      setError('Произошла непредвиденная ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer fullHeight>
      <StyledCard title="Вход в систему">
        <form onSubmit={handleSubmit}>
          <StyledInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <StyledInput
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div style={{
              color: '#ef233c',
              margin: '10px 0',
              textAlign: 'center'
            }}>
              {error.includes('password') ? 'Неверный пароль' : 
               error.includes('email') ? 'Пользователь с таким email не найден' : 
               error === 'Ошибка входа' ? 'Неверный email или пароль' :
               error === 'Произошла непредвиденная ошибка' ? 'Произошла ошибка' :
               error}
            </div>
          )}

          <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
            <RoutableButton to="/register" style={{textDecoration: 'none'}}>
              Регистрация
            </RoutableButton>
            
            <SubmitButton 
              primary 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Вход...' : 'Войти'}
            </SubmitButton>
          </div>
        </form>
      </StyledCard>
    </StyledContainer>
  );
};

export default Login;
