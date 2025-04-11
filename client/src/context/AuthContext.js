

import { useContext } from 'react';
import { createContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Проверка аутентификации при загрузке
  const checkAuth = useCallback(async () => {
    try {
      const res = await api.get('/users/auth/me');
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/users/auth/me');
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Убедитесь, что это выполняется
      }
    };
    checkAuth();
  }, []);

  // Регистрация
  const register = async (formData) => {
    try {
      const res = await api.post('/users/auth/register', formData);
      setUser(res.data);
      setIsAuthenticated(true);
      return { success: true, data: res.data };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Ошибка регистрации'
      };
    }
  };

  // Вход
  const login = async (formData) => {
    try {
      const res = await api.post('/users/auth/login', formData);
      setUser(res.data);
      setIsAuthenticated(true);
      return { success: true, data: res.data };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Ошибка входа'
      };
    }
  };

  // Выход
  const logout = async () => {
    try {
      await api.post('/users/auth/logout');
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      // Перенаправление на главную страницу после выхода
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Для удобства использования
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};