// Пример для Register.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '', // Добавлено
    lastName: '',  // Добавлено
    gender: 'male' // Добавлено
  });

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      {/* Добавленные поля */}
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Имя"
        required
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Фамилия"
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
        <option value="other">Другой</option>
      </select>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default Register;