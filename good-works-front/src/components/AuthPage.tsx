import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_HOST } from '../config';

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {
      const response = await axios.post(`${API_HOST}/auth/login`, { username, password });
      const token = response.data.access_token;
      const userid = response.data.userid;
      // console.log(token) http://localhost:3002/auth/profile
      
      Cookies.set('token', token);
      Cookies.set('userid', userid);
      dispatch(login({ username }));
      navigate('/friends');
    } catch (error) {
      console.log('Неверный логин или пароль');
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
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
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default AuthPage;
