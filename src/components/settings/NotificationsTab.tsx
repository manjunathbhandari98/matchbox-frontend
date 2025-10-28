import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { setUserInfo } from '../../redux/authSlice';
import { updateUser } from '../../services/userService';
import { PageTitle } from '../ui/PageTitle';
import { ToggleItem } from './ToggleItem';

export const NotificationsTab = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  const handleToggle = async (key: string, value: boolean) => {
    try {
      const updatedSettings = {
        ...user.settings,
        [key]: value,
      };

      const updatedUser = await updateUser(user.email, {
        settingsRequest: updatedSettings,
      });

      dispatch(setUserInfo(updatedUser));

      toast.success('Notification preference updated');
    } catch (err) {
      console.error('Error updating notification:', err);
      toast.error('Failed to update preference');
    }
  };

  const notifications = [
    {
      title: 'Email Notification',
      desc: 'Receive email updates about your projects',
      key: 'emailNotifications',
      defaultEnabled: user?.settings.emailNotifications,
    },
    {
      title: 'Task Assignment',
      desc: "Get notified when you're assigned to a task",
      key: 'taskAssignmentNotifications',
      defaultEnabled: user?.settings.taskAssignmentNotifications,
    },
    {
      title: 'Project Updates',
      desc: 'Notifications about project changes',
      key: 'projectUpdateNotifications',
      defaultEnabled: user?.settings.projectUpdateNotifications,
    },
    {
      title: 'Comments & Mentions',
      desc: 'When someone mentions or comments on your work',
      key: 'commentsAndMentionNotifications',
      defaultEnabled: user?.settings.commentsAndMentionNotifications,
    },
    {
      title: 'Weekly Summary',
      desc: 'Receive a weekly summary of your activty',
      key: 'weeklySummary',
      defaultEnabled: user?.settings.weeklySummary,
    },
  ];

  return (
    <div className="p-4 space-y-6 bg-white dark:bg-zinc-800 rounded-xl">
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
            onToggle={(value) => handleToggle(item.key, value)}
          />
        ))}
      </div>
    </div>
  );
};
