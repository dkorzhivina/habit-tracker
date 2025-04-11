import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StyledContainer from '../components/ui/StyledContainer';
import StyledCard from '../components/ui/StyledCard';
import SubmitButton from '../components/ui/SubmitButton';
import StyledInput from '../components/ui/StyledInput';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 8) {
      setError('Пароль должен содержать минимум 8 символов');
      return;
    }

    if (!/[A-Z]/.test(formData.password)) {
      setError('Пароль должен содержать хотя бы одну заглавную букву');
      return;
    }

    if (!/\d/.test(formData.password)) {
      setError('Пароль должен содержать хотя бы одну цифру');
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        username: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        navigate('/profile');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Произошла ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer fullHeight>
      <StyledCard title="Регистрация">
        <form onSubmit={handleSubmit}>
          <StyledInput
            label="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <StyledInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <StyledInput
            label="Пароль"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <StyledInput
            label="Подтвердите пароль"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {error && (
            <div style={{
              color: '#ef233c',
              margin: '10px 0',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
            <SubmitButton 
              primary 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </SubmitButton>
          </div>
        </form>
      </StyledCard>
    </StyledContainer>
  );
};

export default Register;
