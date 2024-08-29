import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFriendAndFetch, removeFriendAndFetch, fetchFriends } from '../features/friendsSlice';
import { AppDispatch, RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';

const FriendsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const friends = useSelector((state: RootState) => state.friends.list);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const handleAddFriend = (userId: number, friend_name: string) => {
    dispatch(addFriendAndFetch({ friendId: userId, friend_name }));
  };

  const handleRemoveFriend = (userId: number) => {
    dispatch(removeFriendAndFetch({ friendId: userId }));
  };

  // if (userId && friend.id === parseInt(userId, 10)) {
  //   const userid = Cookies.get('userid');
  //   return null;
  // }

  return (
    <div className="p-4">
      <h1 className="text-2xl">Друзья</h1>
      <input
        type="text"
        placeholder="Поиск друзей"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2"
      />
      <ul>
        {friends.filter(friend => friend.username.includes(searchTerm)).map(friend => (
          // if (condition) {
            
          // }
          <li key={friend.id} className="flex justify-between items-center my-2">
            <div>{friend.username}</div>
            {friend.isfriend ? ( // Проверяем, добавлен ли друг
              <button
                onClick={() => handleRemoveFriend(friend.friendId)} 
                className="border border-gray-300 px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded transition mr-2"
              >
                Удалить
              </button>
            ) : (
              <button
                onClick={() => handleAddFriend(friend.id, friend.username)} 
                className="border border-gray-300 px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded transition mr-2"
              >
                Добавить
              </button>
            )}
            <button 
              onClick={() => navigate(`/user/${friend.id}`)} 
              className="border border-gray-300 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition"
            >
              Перейти
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsPage;
