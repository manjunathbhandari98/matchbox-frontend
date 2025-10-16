import { useState } from 'react';
import { PageTitle } from '../components/ui/PageTitle';

// Import your settings sections
import { AppearanceTab } from '../components/settings/AppearanceTab';
import { NotificationsTab } from '../components/settings/NotificationsTab';
import { ProfileTab } from '../components/settings/ProfileTab';
import { SecurityTab } from '../components/settings/SecurityTab';

export const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Define tabs and components in one scalable structure
  const settingTabs = [
    { label: 'Profile', component: <ProfileTab /> },
    { label: 'Notifications', component: <NotificationsTab /> },
    { label: 'Appearance', component: <AppearanceTab /> },
    { label: 'Security', component: <SecurityTab /> },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
      <PageTitle
        title="Settings"
        desc="Manage your account preferences and settings"
      />

      {/* Tabs */}
      <div className="inline-flex p-1.5 gap-2 bg-blue-100/60 dark:bg-zinc-900/40 rounded-lg backdrop-blur-sm w-fit">
        {settingTabs.map((tab, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`
              cursor-pointer px-4 py-1.5 rounded-lg text-sm font-medium 
              transition-all duration-200
              ${
                activeTab === idx
                  ? 'bg-white dark:bg-zinc-800 text-blue-700 dark:text-cyan-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-200 hover:text-blue-700 dark:hover:text-cyan-300 hover:bg-blue-50 dark:hover:bg-zinc-600'
              }
            `}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Dynamic content */}
      <div className="mt-4 p-5 rounded-2xl border border-gray-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 shadow-sm transition-all duration-200">
        {settingTabs[activeTab].component}
      </div>
    </div>
  );
};
