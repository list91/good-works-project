import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { API_HOST } from '../config';
import { useLocation, useNavigate } from 'react-router-dom';
// "id": 13,
// "content": "2",
// "master": 2
interface Task {
  id: number;
  content: string;
  master: number
}

interface TasksState {
  list: Task[];
}

const initialState: TasksState = {
  list: [],
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (urlPath: string) => {
  const token = Cookies.get('token'); // Получаем токен из куки
  const response = await fetch(`${API_HOST}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const parts = urlPath.split('/');
  const lastPart = parts[parts.length - 1];
  const data = await response.json();
  
  if (!Array.isArray(data)) {
    throw new Error('Expected data to be an array');
  }
  
  const transformedData = data
  .map((task) => ({
    id: task.id,
    content: task.content,
    master: task.master,
  }))
  .filter((task) => task.master === Number(lastPart));
  // console.log(transformedData);

  return transformedData;
});

  

export const getTask = createAsyncThunk('tasks/getTask', async (id: string) => {
  const response = await fetch(`/api/tasks/${id}`);
  return response.json();
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, content }: { id: string; content: string }) => {
  const userid = Cookies.get('userid');
  const token = Cookies.get('token');
  const response = await fetch(`${API_HOST}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ content, master: userid }),
  });
  return response.json();
});
export const removeTask = createAsyncThunk('tasks/removeTask', async ({ id }: { id: number }, {dispatch}) => {
  // const userid = Cookies.get('userid');
  console.log(id)
  const token = Cookies.get('token');
  const response = await fetch(`${API_HOST}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const location = useLocation();
  console.log(location)
  return dispatch(fetchTasks(location.pathname));
});
export const createTask = createAsyncThunk('tasks/createTask', async ({ id }: { id: number }) => {
  // const userid = Cookies.get('userid');
  console.log(id)
  const token = Cookies.get('token');
  const response = await fetch(`${API_HOST}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ content: "", master: id }),
    
  });
  const navigate = useNavigate();
  const data = await response.json();
  console.log(data)
  navigate(`/tasks/${data.id}`)
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(getTask.fulfilled, (state, action) => {
      const index = state.list.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      } else {
        state.list.push(action.payload);
      }
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.list.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      // const idToRemove = action.meta.arg.id; // Получаем id из аргумента
      // state.list = state.list.filter(task => task.id !== idToRemove); // Удаляем задачу из списка
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      // const idToRemove = action.meta.arg.id; // Получаем id из аргумента
      // state.list = state.list.filter(task => task.id !== idToRemove); // Удаляем задачу из списка
    });
  },
  
});

export default tasksSlice.reducer;
