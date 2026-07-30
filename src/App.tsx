import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import UserPage from './components/pages/UserPage';
import TaskPage from './components/pages/TaskPage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UserPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="task" element={<TaskPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;