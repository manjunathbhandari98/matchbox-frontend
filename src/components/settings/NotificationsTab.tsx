import { PageTitle } from '../ui/PageTitle';
import { ToggleItem } from './ToggleItem';

export const NotificationsTab = () => {
  const notifications = [
    {
      title: 'Email Notification',
      desc: 'Receive email updates about your projects',
      defaultEnabled: true,
    },
    {
      title: 'Task Assignment',
      desc: "Get notified when you're assigned to a task",
      defaultEnabled: true,
    },
    {
      title: 'Project Updates',
      desc: 'Notifications about project changes',
      defaultEnabled: true,
    },
    {
      title: 'Comments & Mentions',
      desc: 'When someone mentions or comments on your work',
      defaultEnabled: true,
    },
    {
      title: 'Weekly Summary',
      desc: 'Receive a weekly summary of your activty',
      defaultEnabled: false,
    },
  ];

  return (
    <div className="p-4 space-y-6 bg-gray-50 rounded-xl">
      <PageTitle
        title="Notifications Preference"
        desc="Manage how you receive notifications"
      />

      {/* Map over notifications */}
      <div className="flex flex-col gap-4">
        {notifications.map((item, idx) => (
          <ToggleItem
            key={idx}
            title={item.title}
            desc={item.desc}
            defaultEnabled={item.defaultEnabled}
          />
        ))}
      </div>
    </div>
  );
};
