import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { setTheme } from '../../redux/themeSlice';
import { PageTitle } from '../ui/PageTitle';

export const AppearanceTab = () => {
  const dispatch = useDispatch();
  const activeTheme = useSelector((state: RootState) => state.theme.current);

  const themes = [
    { label: 'Light', value: 'light', desc: 'Clean and bright' },
    { label: 'Dark', value: 'dark', desc: 'Easy on the eyes' },
  ];

  return (
    <div className="p-6 bg-white dark:bg-zinc-800 min-h-[calc(100vh-64px)] rounded-xl">
      <PageTitle
        title="Appearance Settings"
        desc="Customize how TeamFlow looks for you"
      />

      <div className="mt-6">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Theme
        </h2>
        <div className="flex gap-4 w-full">
          {themes.map((theme, idx) => (
            <div
              key={idx}
              onClick={() => dispatch(setTheme(theme.value))}
              className={`
                w-1/2 cursor-pointer rounded-2xl border-2 p-4 flex flex-col gap-5 transition-all duration-300
                ${
                  activeTheme === theme.value
                    ? 'border-blue-500 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }
              `}
            >
              {/* Theme Preview */}
              <div
                className={`rounded-xl h-24 transition-colors duration-300 ${
                  theme.value === 'light'
                    ? 'bg-gradient-to-br from-white to-gray-100'
                    : 'bg-gradient-to-br from-gray-800 to-gray-900'
                }`}
              ></div>

              {/* Theme Info */}
              <h2 className="font-semibold text-gray-900 dark:text-gray-200">
                {theme.label}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {theme.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
