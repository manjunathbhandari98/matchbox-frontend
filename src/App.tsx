import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  return (
    <div className="fira-code">
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

        {/* Private (authenticated) pages */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
