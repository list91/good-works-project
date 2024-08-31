import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';

const TasksPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.list);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl">Задачи</h1>
      <input
        type="text"
        placeholder="Поиск задач"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2"
      />
      <ul>
        {tasks.filter(task => task.content.includes(searchTerm)).map(task => (
          <li key={task.id}>
            <a href={`/task/${task.id}`}>{task.content}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
