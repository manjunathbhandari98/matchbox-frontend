import { Navigate, Route, Routes } from 'react-router-dom';
import { Analytics } from './pages/Analytics';
import { AppLayout } from './pages/AppLayout';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { Projects } from './pages/Projects';
import { Tasks } from './pages/Tasks';
import { Teams } from './pages/Teams';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />

      {/* Private pages inside AppLayout */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        {/* Default route when logged in */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="teams" element={<Teams />} />
      </Route>
    </Routes>
  );
}

export default App;
