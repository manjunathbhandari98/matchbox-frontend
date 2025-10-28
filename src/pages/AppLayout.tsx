import {
  BarChart2,
  Bell,
  CheckSquare,
  Folder,
  LayoutDashboard,
  Moon,
  Search,
  Sun,
  Users,
} from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import type { RootState } from '../app/store';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import colors from '../constants/colors';
import { setTheme } from '../redux/themeSlice';

export const AppLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.current);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const root = document.documentElement; // <html>
    if (currentTheme === 'dark') {
      root.setAttribute('class', currentTheme);
    } else {
      root.removeAttribute('data-theme');
      root.setAttribute('class', currentTheme);
    }
  }, [currentTheme]);

  const sidebarOptions = [
    {
      option: 'Dashboard',
      link: '/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    { option: 'Projects', link: '/projects', icon: <Folder size={20} /> },
    { option: 'Tasks', link: '/tasks', icon: <CheckSquare size={20} /> },
    { option: 'Analytics', link: '/analytics', icon: <BarChart2 size={20} /> },
    { option: 'Team', link: '/teams', icon: <Users size={20} /> },
  ];

  const themeModes = [
    { mode: 'Light', value: 'light', icon: <Sun size={16} /> },
    { mode: 'Dark', value: 'dark', icon: <Moon size={16} /> },
  ];

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gray-50 dark:bg-zinc-900">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 bg-white dark:bg-zinc-900 shadow-sm p-4">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 mb-10 select-none hover:scale-105 transition-transform duration-200"
        >
          <img
            src="/matchbox-logo-new.png"
            alt="Matchbox Logo"
            className="w-7 h-7 rounded-xl"
          />
          <h2 className="text-xl font-semibold tracking-tight source-serif">
            <span className="dark:text-white">Match</span>
            <span style={{ color: colors.primary }}>Box</span>
          </h2>
        </Link>

        {/* Sidebar Options */}
        <nav className="flex flex-col gap-2">
          {sidebarOptions.map((option, index) => {
            const isActive = location.pathname === option.link;
            return (
              <Link
                key={index}
                to={option.link}
                className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white dark:bg-blue-500'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-zinc-700 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {option.icon}
                <span>{option.option}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex justify-between items-center p-4 bg-primary dark:bg-zinc-900 shadow-sm">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 dark:bg-zinc-700 rounded-xl px-3 py-2 gap-2 w-80">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none border-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <Search
              size={20}
              className="text-gray-500 dark:text-gray-400 cursor-pointer"
            />
          </div>

          {/* Profile / Theme / Notifications */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <div className="flex bg-gray-200 dark:bg-zinc-700 rounded-full p-1 gap-2">
              {themeModes.map((mode, index) => (
                <div
                  key={index}
                  onClick={() => dispatch(setTheme(mode.value))}
                  className={`p-2 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-200 ${
                    currentTheme === mode.value
                      ? 'bg-gray-900 dark:bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-zinc-600'
                  }`}
                >
                  {mode.icon}
                </div>
              ))}
            </div>

            {/* Notifications */}
            <div className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer text-gray-700 dark:text-gray-300">
              <Bell size={20} />
            </div>

            {/* Profile Avatar */}
            <Link
              to={'/settings'}
              className="w-8 h-8 bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center rounded-full font-medium cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              {user.fullName
                .split(' ')
                .map((n: string) => n[0])
                .join('')}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-zinc-900">
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
    </div>
  );
};
