import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { createTask, fetchTasks, removeTask } from '../features/tasksSlice';
import Cookies from 'js-cookie';

const UserPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.friends.list.find((user: any) => user.id === Number(id)));
  const myid = Cookies.get('userid');
  const isMe = Number(myid) === Number(id);
  const navigate = useNavigate();

  const tasks = useSelector((state: RootState) => state.tasks.list);
  console.log(tasks);

  useEffect(() => {
    // dispatch(fetchTasks(location.pathname));
    console.log(323223232332);
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl">{user?.username}</h1>
      {user?.friendId || isMe ? (
        <div>
          <h2>Задачи:</h2>
          <ul className="flex flex-col gap-2">
            {tasks.map((task: any) => (
              <div key={task.id} className="flex items-center gap-2">
                <li className="flex-grow">{task.content}</li>
                {isMe && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/task/${task.id}`)} 
                      className="border border-gray-300 px-3 py-1 bg-gray-500 text-white hover:bg-red-600 rounded transition"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => dispatch(removeTask({ id: task.id }))} 
                      className="border border-gray-300 px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded transition"
                    >
                      Удалить
                    </button>
                  </div>
                )}
              </div>
            ))}
          </ul>
          {isMe && (
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => dispatch(createTask({ id: Number(id) }))} 
                className="border border-gray-300 px-3 py-1 bg-gray-500 text-white hover:bg-red-600 rounded transition"
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
