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
      <div className="inline-flex p-1.5 bg-blue-100/60 rounded-lg backdrop-blur-sm w-fit">
        {settingTabs.map((tab, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`
              cursor-pointer px-4 py-1.5 rounded-lg text-sm font-medium 
              transition-all duration-200
              ${
                activeTab === idx
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
              }
            `}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Dynamic content */}
      <div className="mt-4 p-5 rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200">
        {settingTabs[activeTab].component}
      </div>
    </div>
  );
};
