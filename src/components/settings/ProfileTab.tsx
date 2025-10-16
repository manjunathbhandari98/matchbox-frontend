import { Check, Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Avatar } from '../ui/Avatar';
import { PageTitle } from '../ui/PageTitle';

export const ProfileTab = () => {
  const [username, setUsername] = useState('krishna_murthy');
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<null | boolean>(null);

  useEffect(() => {
    if (!username) {
      setAvailable(null);
      return;
    }

    setChecking(true);
    const delay = setTimeout(() => {
      // Mock availability check
      setAvailable(username.length >= 5);
      setChecking(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [username]);

  return (
    <div className="p-2">
      <PageTitle
        title="Profile Information"
        desc="Update your personal information and account details"
      />

      {/* Profile picture */}
      <div className="flex items-center gap-6 mt-6">
        <div className="relative group">
          <Avatar name="Krishna Murthy" size={38} />
        </div>
        <button
          className="px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium 
                     text-gray-700 hover:border-blue-400 hover:text-blue-600 
                     transition-all duration-200"
        >
          Change Profile
        </button>
      </div>

      <div className="my-6 border-t border-gray-200"></div>

      {/* Profile form */}
      <form className="flex flex-col gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="mt-2 w-full p-3 rounded-xl border border-gray-300 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       outline-none transition-all duration-200"
            value={'Krishna Murthy'}
          />
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="font-medium text-gray-700">
            Username
          </label>
          <div
            className="mt-2 flex items-center gap-2 w-full rounded-xl border border-gray-300 
                       px-3 py-2 transition-all duration-200 focus-within:ring-2 
                       focus-within:ring-blue-500 focus-within:border-blue-500 bg-white"
          >
            {/* <User className="text-gray-400" size={18} /> */}
            <input
              id="username"
              type="text"
              className="w-full border-none outline-none text-gray-700"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
            />
            {checking ? (
              <Loader2 className="animate-spin text-blue-600" size={18} />
            ) : available === true ? (
              <Check className="text-green-500" size={20} />
            ) : available === false ? (
              <X className="text-red-500" size={20} />
            ) : null}
          </div>
          {available === false && (
            <p className="text-red-500 text-sm mt-1">
              Username is not available
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-2 w-full p-3 rounded-xl border border-gray-300 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       outline-none transition-all duration-200"
            value={'krishnamurthy@mail.com'}
          />
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            className="mt-2 w-full p-3 rounded-xl border border-gray-300 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       outline-none transition-all duration-200 resize-none"
            value={'Product designer and team leader'}
          />
        </div>

        {/* Save button */}
        <button
          type="submit"
          className="mt-4 px-6 py-3 font-medium text-white rounded-xl 
                     bg-gradient-to-r from-cyan-600 to-blue-600 
                     shadow-md hover:shadow-lg active:scale-[0.98] 
                     transition-all duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
