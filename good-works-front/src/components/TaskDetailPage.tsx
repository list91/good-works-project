import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTask, updateTask } from '../features/tasksSlice';
import { AppDispatch } from '../app/store';
import Cookies from 'js-cookie';

const TaskDetailPage: React.FC = () => {
  const userid = Cookies.get('userid');
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const task = useSelector((state: any) => state.tasks.list.find((task: any) => task.id === Number(id)));
  const [content, setContent] = useState('');
  console.log(task)

  useEffect(() => {
    if (!id) {
      // Если id отсутствует, можно перенаправить на страницу задач или обработать ошибку
      navigate('/tasks'); // Пример: перенаправить, если id нет
      return;
    }

    if (task) {
      setContent(task.content);
    } else {
      dispatch(getTask(id)); // Загрузка задачи
    }
  }, [dispatch, id, task]);

  const handleSave = () => {
    if (id) {
      dispatch(updateTask({ id, content })).then(() => {
        
        navigate(`/user/${userid}`); // После сохранения перенаправить на страницы задач
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Редактирование задачи</h1>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2"
      />
      <button onClick={handleSave} className="ml-2 bg-green-500 text-white p-1 rounded">Сохранить</button>
    </div>
  );
};

export default TaskDetailPage;
