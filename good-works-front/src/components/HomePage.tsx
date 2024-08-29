import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl">Добро пожаловать в приложение задач!</h1>
      <p className="mt-2">Вы можете управлять своими задачами, добавлять новые, редактировать и удалять их.</p>
      <div className="mt-4">
        <Link to="/tasks" className="bg-blue-500 text-white p-2 rounded">Перейти к задачам</Link>
      </div>
    </div>
  );
};

export default HomePage;
