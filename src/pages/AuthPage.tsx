import { X } from 'lucide-react'; // <-- icon for close button
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import colors from '../constants/colors';

type ModeType = {
  mode: string;
  link: string;
};

const AuthPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mode = params.get('mode');
  const navigate = useNavigate();
  const modes: ModeType[] = [
    { mode: 'login', link: '/auth?mode=login' },
    { mode: 'signup', link: '/auth?mode=signup' },
  ];
  const [activeMode, setActiveMode] = useState('login');

  const toggleMode = (mode: ModeType) => {
    setActiveMode(mode.mode);
    navigate(mode.link);
  };

  return (
    <div className="flex gap-2 bg-blue-50 items-center w-full">
      <div className="flex flex-col gap-5 items-center justify-center w-1/2 min-h-screen">
        <img
          src="/matchbox-logo-new.png"
          alt="matchbox-logo"
          className="w-40 h-40"
        />
        <h2 className="text-2xl font-semibold tracking-tight source-serif ">
          <span>Match</span>
          <span style={{ color: colors.primary }}>Box</span>
        </h2>
        <p className="font-medium">Work smarter, together.</p>
      </div>

      <div className="relative bg-white p-4 flex flex-col items-center gap-4 mx-4 rounded-xl w-1/2">
        {/* Close Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold">Welcome to MatchBox</h2>
        <p className="text-gray-500">
          Sign in to your account or create a new one
        </p>

        <div className="bg-gray-100 flex items-center text-center gap-2 rounded-lg p-1 w-full">
          {modes.map((mode, index) => (
            <div
              key={index}
              className={`w-1/2 p-2 cursor-pointer text-sm text-gray-800 font-medium rounded-xl capitalize ${activeMode == mode.mode && 'bg-white'}`}
              onClick={() => toggleMode(mode)}
            >
              {mode.mode}
            </div>
          ))}
        </div>

        {mode === 'signup' ? <Signup /> : <Login />}
      </div>
    </div>
  );
};

export default AuthPage;
