import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import friendsReducer from '../features/friendsSlice';
import tasksReducer from '../features/tasksSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendsReducer,
    tasks: tasksReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
