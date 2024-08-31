import React, { useState } from 'react';
import axios from 'axios';
import { API_HOST } from '../config';
import { useNavigate } from 'react-router-dom';
const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const handleRegister = async () => {
    // try {
    //   await axios.post(`${API_HOST}/auth/register`, { username, password });
    //   alert('Регистрация прошла успешно!'); // Или перенаправьте на страницу входа
    // } catch (error) {
    //   setErrorMsg('Ошибка регистрации. Попробуйте еще раз.');
    //   console.log(error);
    // }
    // const token = Cookies.get('token');
    // const userid = Cookies.get('userid');

    const response = await fetch(`${API_HOST}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ username: username, pass: password }),
    });
    console.log(response)
    if (!response.ok) {
      // throw new Error('Network response was not ok');
      alert("Не удалось создать пользователя")
    }

    const data = await response.json();
    console.log(data)
    // const transformedData = data.map((friend: { 
    //   id: number; 
    //   friend_tag: string; 
    //   user_id: number; 
    // }) => ({
    //   id: String(friend.id),
    //   name: friend.friend_tag,
    //   isFriend: friend.user_id === Number(userid)
    // }));
    console.log(data.message);
    
    if (data.message == "User registered successfully") {
      alert("Успешно")
      navigate("/login")

    } else {
      alert("Не удалось создать пользователя")
    }
    
    // if (!Array.isArray(data)) {
    //   throw new Error('Expected data to be an array');
    // }
    
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
