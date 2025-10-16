import { useState } from 'react';

export const ToggleItem = ({
  title,
  desc,
  defaultEnabled,
}: {
  title: string;
  desc: string;
  defaultEnabled: boolean;
}) => {
  const [enabled, setEnabled] = useState(defaultEnabled);

  return (
    <div className="flex items-center justify-between p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col gap-1">
        <h2 className="font-medium text-gray-900 dark:text-gray-200">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          enabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-zinc-700'
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${
            enabled ? 'translate-x-6' : ''
          }`}
        />
      </button>
    </div>
  );
};
