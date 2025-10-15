import { Link, useNavigate } from 'react-router-dom';
import colors from '../../constants/colors';
import CommonButton from '../ui/CommonButton';

const Header = () => {
  const navOptions = [
    { id: 1, title: 'Features', link: '/features' },
    { id: 2, title: 'Guide', link: '/guide' },
    { id: 3, title: 'Pricing', link: '/pricing' },
  ];

  const navigate = useNavigate();

  return (
    <div className="p-3 flex justify-between items-center">
      {/* Options and Logo */}
      {/* logo */}
      <div className="flex gap-10 items-center">
        <Link
          to="/"
          className="flex items-center gap-3 cursor-pointer select-none transition-transform duration-200 hover:scale-[1.02]"
        >
          <img
            src="/matchbox-logo-new.png"
            alt="Matchbox Logo"
            className="w-10 h-10 rounded-xl"
          />
          <h2 className="text-2xl font-semibold tracking-tight source-serif ">
            <span>Match</span>
            <span style={{ color: colors.primary }}>Box</span>
          </h2>
        </Link>

        {navOptions.map((option) => (
          <Link
            to={option.link}
            key={option.id}
            className="font-medium mx-3 text-[15px] hover:text-blue-600"
          >
            {option.title}
          </Link>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <CommonButton
          text="Login"
          color={colors.primary}
          borderColor={colors.primaryDark}
          bgColor="transparent"
          size="md"
          rounded="md"
          onClick={() => navigate('/auth?mode=login')}
        />

        <CommonButton
          text="Signup"
          bgColor={colors.primary}
          size="md"
          rounded="md"
          onClick={() => navigate('/auth?mode=signup')}
          className="text-white"
        />
      </div>
    </div>
  );
};

export default Header;
