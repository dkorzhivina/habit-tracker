import { createContext, useState, useEffect, useCallback, useContext } from 'react';
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
    checkAuth();
  }, [checkAuth]);

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
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
  };

  // Обновление данных пользователя
  const updateUser = async (updatedData) => {
    try {
      const res = await api.patch('/users/me', updatedData);
      setUser(prev => ({ ...prev, ...res.data }));
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Ошибка обновления профиля'
      };
    }
  };

  // Загрузка аватарки
  const uploadAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const res = await api.patch('/users/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setUser(prev => ({ ...prev, avatar: res.data.avatarUrl }));
      return { success: true, url: res.data.avatarUrl };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Ошибка загрузки аватарки'
      };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
    checkAuth,
    updateUser,
    uploadAvatar
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};