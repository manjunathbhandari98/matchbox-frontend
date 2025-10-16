import { PageTitle } from '../ui/PageTitle';
import { ToggleItem } from './ToggleItem';

export const SecurityTab = () => {
  const notifications = [
    {
      title: 'Two-Factor Authentication',
      desc: 'Add an extra layer of security to your account',
      defaultEnabled: false,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-64px)] rounded-xl space-y-8">
      <PageTitle
        title="Security Settings"
        desc="Manage your account security"
      />

      {/* Change Password Form */}
      <form className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Change Password
        </h2>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="currentPassword"
            className="text-gray-700 font-medium"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter current password"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword" className="text-gray-700 font-medium">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter new password"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-gray-700 font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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

      {/* Active Sessions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Active Sessions</h2>

        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-900">Current Session</h3>
            <p className="text-gray-500 text-sm">Chrome on MacOS</p>
          </div>
          <button className="text-red-500 font-semibold hover:text-red-600 transition">
            Logout
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition">
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-900">Last Session</h3>
            <p className="text-gray-500 text-sm">Firefox on Windows</p>
          </div>
          <button className="text-red-500 font-semibold hover:text-red-600 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
