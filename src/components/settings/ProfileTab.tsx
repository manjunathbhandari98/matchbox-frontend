import { Check, Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { setUserInfo } from '../../redux/authSlice';
import { checkUsernameAvailability } from '../../services/authService';
import { updateUser } from '../../services/userService';
import { Avatar } from '../ui/Avatar';
import { PageTitle } from '../ui/PageTitle';

export const ProfileTab = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<null | boolean>(null);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });

  useEffect(() => {
    const USERNAME_REGEX =
      /^(?=.{3,20}$)(?!.*[_.]{2})[a-z][a-z0-9._]*[a-z0-9]$/;

    if (!USERNAME_REGEX.test(formData.username)) {
      setAvailable(false);
      return;
    }

    if (!formData.username) {
      setAvailable(null);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setChecking(true);
        const isAvailable = await checkUsernameAvailability(formData.username);
        setAvailable(isAvailable);
      } catch (err) {
        console.error('Error checking username:', err);
        setAvailable(null);
      } finally {
        setChecking(false);
      }
    }, 600); // small debounce (0.6s)

    return () => clearTimeout(delay);
  }, [formData.username]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedUser = await updateUser(user.email, formData);
      // update Redux
      dispatch(setUserInfo(updatedUser));
      // update local formData
      setFormData({
        fullName: updatedUser.fullName,
        username: updatedUser.username,
        email: updatedUser.email,
        bio: updatedUser.bio || '',
      });
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="p-2">
      <PageTitle
        title="Profile Information"
        desc="Update your personal information and account details"
      />

      {/* Profile picture */}
      <div className="flex items-center gap-6 mt-6">
        <div className="relative group">
          <Avatar name={formData?.fullName} size={44} />
        </div>
        <button
          className="px-4 py-2.5 border border-gray-300 dark:border-zinc-600 rounded-xl text-sm font-medium 
                     text-gray-700 dark:text-gray-200 cursor-pointer hover:border-blue-400 hover:text-blue-600 
                     transition-all duration-200"
        >
          Change Profile
        </button>
      </div>

      <div className="my-6 border-t border-gray-200 dark:border-zinc-700"></div>

      {/* Profile form */}
      <form className="flex flex-col gap-5" onSubmit={handleUpdate}>
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="mt-2 w-full p-3 rounded-xl border border-gray-300
            dark:border-zinc-700 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       outline-none transition-all duration-200"
            name="fullName"
            value={formData?.fullName}
            onChange={handleChange}
          />
        </div>

        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            Username
          </label>
          <div
            className="mt-2 flex items-center gap-2 w-full rounded-xl border border-gray-300
            dark:border-zinc-700 
                       px-3 py-2 transition-all duration-200 focus-within:ring-2 
                       focus-within:ring-blue-500 focus-within:border-blue-500 "
          >
            {/* <User className="text-gray-400" size={18} /> */}
            <input
              id="username"
              type="text"
              name="username"
              className="w-full border-none outline-none text-gray-700 dark:text-gray-300"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
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
          <label
            htmlFor="email"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-2 w-full p-3 rounded-xl border border-gray-300 dark:border-zinc-700
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white
                       outline-none transition-all duration-200"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Bio */}
        <div>
          <label
            htmlFor="bio"
            className="font-medium text-gray-700 dark:text-gray-200"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            name="bio"
            className="mt-2 w-full p-3 rounded-xl border border-gray-300 dark:border-zinc-700
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white
                       outline-none transition-all duration-200 resize-none"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        {/* Save button */}
        <button
          type="submit"
          disabled={checking}
          className={`mt-4 px-6 py-3 font-medium text-white rounded-xl 
              bg-gradient-to-r from-cyan-600 to-blue-600 
              shadow-md hover:shadow-lg active:scale-[0.98] 
              transition-all duration-300
              ${checking ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {checking ? 'Checking...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};
