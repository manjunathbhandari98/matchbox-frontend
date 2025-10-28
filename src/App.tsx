import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import type { RootState } from './app/store';
import { AddProject } from './pages/AddProject';
import { Analytics } from './pages/Analytics';
import { AppLayout } from './pages/AppLayout';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { ProfileSettings } from './pages/ProfileSettings';
import { Projects } from './pages/Projects';
import { Tasks } from './pages/Tasks';
import { Teams } from './pages/Teams';
import { setUserInfo } from './redux/authSlice';
import { initializeTheme } from './redux/themeSlice';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { getUserInfo } from './services/userService';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  // ✅ Fetch user only if logged in (has email)
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.email) return; // <-- prevent API call if user not logged in

      try {
        const data = await getUserInfo(user.email);
        if (data) dispatch(setUserInfo(data));
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, [dispatch, user?.email]); // safe optional chaining

  // ✅ Initialize theme safely (fallback to 'light')
  useEffect(() => {
    const theme = user?.settings?.theme?.toLowerCase() || 'light';
    dispatch(initializeTheme(theme));
  }, [user?.settings?.theme, dispatch]);

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
        <Route path="settings" element={<ProfileSettings />} />
        <Route path="/create-project" element={<AddProject />} />
      </Route>
    </Routes>
  );
}

export default App;
