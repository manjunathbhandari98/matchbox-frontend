import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { logout, setUserInfo } from '../../redux/authSlice';
import { updatePassword, updateUser } from '../../services/userService';
import { getDeviceInfo } from '../../utils/getDeviceInfo';
import LoadingSpinner from '../ui/LoadingSpinner';
import { PageTitle } from '../ui/PageTitle';
import { ToggleItem } from './ToggleItem';

export const SecurityTab = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [device, setDevice] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getDeviceInfo().then(setDevice);
  }, []);

  if (!user) return <LoadingSpinner />;

  const notifications = [
    {
      title: 'Two-Factor Authentication',
      desc: 'Add an extra layer of security to your account',
      defaultEnabled: user?.settings.twoFactorAuth,
    },
  ];

  const handleToggle = async (value: boolean) => {
    if (!user) return;
    try {
      const updatedSettings = { ...user.settings, twoFactorAuth: value };
      const updatedUser = await updateUser(user.email, {
        settingsRequest: updatedSettings,
      });
      dispatch(setUserInfo(updatedUser));
    } catch (err) {
      console.error('Error updating notification:', err);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check for empty fields
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    // Check if new and confirm passwords match
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    // Optional: prevent same as old password
    if (oldPassword === newPassword) {
      setError('New password cannot be same as old password.');
      return;
    }

    try {
      await updatePassword(user?.email, {
        oldPassword,
        newPassword,
      });
      toast.success('Password Updated Succesfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Failed to update password. Please try again.');
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-zinc-800 min-h-[calc(100vh-64px)] rounded-xl space-y-8">
      <PageTitle
        title="Security Settings"
        desc="Manage your account security"
      />

      {/* Change Password Form */}
      <form
        onSubmit={handlePasswordUpdate}
        className="space-y-4 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Change Password
        </h2>

        {error && (
          <p className="text-red-500 bg-red-100 dark:bg-red-900/20 p-2 rounded-md">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="currentPassword"
            className="text-gray-700 dark:text-gray-200 font-medium"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="p-3 border border-gray-300 dark:border-zinc-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter current password"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="newPassword"
            className="text-gray-700 dark:text-gray-200 font-medium"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-3 border border-gray-300 dark:border-zinc-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter new password"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-gray-700 dark:text-gray-200 font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-3 border border-gray-300 dark:border-zinc-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Confirm new password"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Update Password
        </button>
      </form>

      {/* Two-Factor Auth */}
      <div className="flex flex-col gap-4">
        {notifications.map((item, idx) => (
          <ToggleItem
            key={idx}
            title={item.title}
            desc={item.desc}
            defaultEnabled={item.defaultEnabled}
            onToggle={(value) => handleToggle(value)}
          />
        ))}
      </div>

      {/* Active Sessions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Active Sessions
        </h2>

        <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900/60 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-900 dark:text-gray-200">
              Current Session
            </h3>
            <p className="text-gray-500 text-sm">{device || 'Detecting...'}</p>
          </div>
          <button
            onClick={() => dispatch(logout())}
            className="text-red-500 cursor-pointer font-semibold hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
