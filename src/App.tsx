import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import Assistant from './pages/Assistant';
import Citations from './pages/Citations';
import Learning from './pages/Learning';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/citations" element={<Citations />} />
          <Route path="/learning" element={<Learning />} />
        </Route>
      </Route>
    </Routes>
  );
}
