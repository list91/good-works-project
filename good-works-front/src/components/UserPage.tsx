import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { createTask, fetchTasks, removeTask } from '../features/tasksSlice';
import Cookies from 'js-cookie';

const UserPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.friends.list.find((user: any) => user.id === Number(id)));
  const location = useLocation();
  const myid = Cookies.get('userid');
  const isMe = Number(myid) === Number(id);
  const navigate = useNavigate();

  const tasks = useSelector((state: RootState) => state.tasks.list);
  console.log(tasks)
  useEffect(() => {
    dispatch(fetchTasks(location.pathname)); // Fetch tasks on component mount
  }, [dispatch, location.pathname]);

  return (
    <div className="p-4">
      <h1 className="text-2xl">{user?.username}</h1>
      {user?.friendId || isMe ? (
        <div>
          <h2>Задачи:</h2>
          <ul>
            {tasks.map((task: any) => (
              <div key={task.id}>
                <li>{task.content}</li>
                {isMe && (
                  <div>
                  <button
                    onClick={() => navigate(`/task/${task.id}`)} // Правильный путь для навигации
                    className="border border-gray-300 px-3 py-1 bg-gray-500 text-white hover:bg-red-600 rounded transition mr-2"
                    >
                    Редактировать
                  </button>
                  <button
                    onClick={() => dispatch(removeTask({id:task.id}))} // Правильный путь для навигации
                    className="border border-gray-300 px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded transition mr-2"
                    >
                    Удалить
                  </button>
                    </div>
                  
                )}
              </div>
            ))}
          </ul>
          {isMe && (
                  <div>
                  <button
                    onClick={() => dispatch(createTask({id: Number(id)}))} // Правильный путь для навигации
                    className="border border-gray-300 px-3 py-1 bg-gray-500 text-white hover:bg-red-600 rounded transition mr-2"
                    >
                    Создать
                  </button>
                    </div>
                  
                )}
        </div>
      ) : (
        <p>Вы не в друзьях. Добавьте их, чтобы видеть задачи.</p>
      )}
    </div>
  );
};

export default UserPage;
