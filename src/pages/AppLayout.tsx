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
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import colors from '../constants/colors';

export const AppLayout = () => {
  const location = useLocation();
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
    { mode: 'Light', icon: <Sun size={16} /> },
    { mode: 'Dark', icon: <Moon size={16} /> },
  ];

  const [activeTheme, setActiveTheme] = useState(0); // 0: light, 1: dark

  const toggleTheme = () => setActiveTheme(activeTheme === 0 ? 1 : 0);

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gray-50">
      {/* Sidebar */}
      <aside className="flex flex-col w-64 bg-white shadow-sm p-4">
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
            <span>Match</span>
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
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
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
        <header className="flex justify-between items-center p-4 bg-white shadow-sm">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 gap-2 w-80">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none border-none text-sm"
            />
            <Search size={20} className="text-gray-500 cursor-pointer" />
          </div>

          {/* Profile / Theme / Notifications */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <div className="flex bg-gray-200 rounded-full p-1 gap-2">
              {themeModes.map((mode, index) => (
                <div
                  key={index}
                  onClick={toggleTheme}
                  className={`p-2 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-200 ${
                    activeTheme === index
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600'
                  }`}
                >
                  {mode.icon}
                </div>
              ))}
            </div>

            {/* Notifications */}
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <Bell size={20} />
            </div>

            {/* Profile Avatar */}
            <Link
              to={'/settings'}
              className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full font-medium cursor-pointer"
            >
              K
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
    </div>
  );
};
