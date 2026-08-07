import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import UserPage from './components/pages/UserPage';
import TaskPage from './components/pages/TaskPage';
import NewUserPage from './components/pages/NewUserPage';
import NewTaskPage from './components/pages/NewTaskPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UserPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="user/new" element={<NewUserPage />} />
        <Route path="task" element={<TaskPage />} />
        <Route path="task/new" element={<NewTaskPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;