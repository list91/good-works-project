import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import FriendsPage from './components/FriendsPage';
import TasksPage from './components/TasksPage';
import UserPage from './components/UserPage';
import TaskDetailPage from './components/TaskDetailPage';
import Header from './components/Header';
import Cookies from 'js-cookie';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/friends" element={isAuthenticated ? <FriendsPage /> : <Navigate to="/login" />} />
        <Route path="/tasks" element={isAuthenticated ? <TasksPage /> : <Navigate to="/login" />} />
        <Route path="/user/:id" element={isAuthenticated ? <UserPage /> : <Navigate to="/login" />} />
        <Route path="/task/:id" element={isAuthenticated ? <TaskDetailPage /> : <Navigate to="/login" />} />
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
