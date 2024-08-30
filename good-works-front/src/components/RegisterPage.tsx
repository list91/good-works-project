import React, { useState } from 'react';
import axios from 'axios';
import { API_HOST } from '../config';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post(`${API_HOST}/auth/register`, { username, password });
      alert('Регистрация прошла успешно!'); // Или перенаправьте на страницу входа
    } catch (error) {
      setErrorMsg('Ошибка регистрации. Попробуйте еще раз.');
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <h2>Регистрация</h2>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      <input
        type="text"
        placeholder="Логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Создать аккаунт</button>
    </div>
  );
};

export default RegisterPage;
