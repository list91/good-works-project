import Cookies from 'js-cookie';
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const userid = Cookies.get('userid');
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between">
        <div>
          <Link to="/home" className="mr-4">Главная</Link>
          <Link to="/friends" className="mr-4">Друзья</Link>
          <Link to={`/user/${userid}`} className="mr-4">Задачи</Link>
          {/* <Link to="/tasks" className="mr-4">Задачи</Link> */}
        </div>
        <div>
          <Link to="/login" className="mr-4">Вход</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
