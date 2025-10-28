/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check, Eye, EyeOff, Loader2, Lock, Mail, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import colors from '../../constants/colors';
import {
  checkUsernameAvailability,
  registerUser,
} from '../../services/authService'; // <-- create this API call
import CommonButton from '../ui/CommonButton';

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<null | boolean>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: 'USER',
    active: true,
  });

  useEffect(() => {
    const USERNAME_REGEX =
      /^(?=.{3,20}$)(?!.*[_.]{2})[a-z][a-z0-9._]*[a-z0-9]$/;

    if (!USERNAME_REGEX.test(username)) {
      setAvailable(false);
      return;
    }

    if (!username) {
      setAvailable(null);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setChecking(true);
        const isAvailable = await checkUsernameAvailability(username);
        setAvailable(isAvailable);
      } catch (err) {
        console.error('Error checking username:', err);
        setAvailable(null);
      } finally {
        setChecking(false);
      }
    }, 600); // debounce (0.6sec)

    return () => clearTimeout(delay);
  }, [username]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validate inputs
    if (
      !formData.fullName ||
      !formData.email ||
      !username ||
      !formData.password
    ) {
      setError('All fields are required.');
      return;
    }

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (available === false) {
      setError('Username is not available.');
      return;
    }

    setLoading(true);
    try {
      const payload = { ...formData, username };
      const response = await registerUser(payload);
      toast.success(response);
      setSuccess(true);
      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: '',
        role: 'USER',
        active: true,
      });
      setConfirmPassword('');
      setUsername('');
      navigate('/auth?mode=login');
    } catch (err: any) {
      console.error('Signup failed:', err);
      setError(err.message || 'Signup failed. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full p-4" onSubmit={handleSubmit}>
      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className="font-medium">
          Full Name
        </label>
        <div className="flex gap-2 p-2 items-center w-full rounded-lg border">
          <User color="gray" size={18} />
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="border-0 outline-0 w-full"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <div className="flex gap-2 p-2 items-center w-full rounded-lg border">
          <Mail color="gray" size={18} />
          <input
            id="email"
            type="email"
            className="border-0 outline-0 w-full"
            placeholder="johndoe@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Username */}
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="font-medium">
          Username
        </label>
        <div className="flex gap-2 p-2 items-center w-full rounded-lg border relative">
          <User color="gray" size={18} />
          <input
            id="username"
            type="text"
            className="border-0 outline-0 w-full"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
          />

          {checking ? (
            <Loader2
              className="animate-spin"
              size={18}
              color={colors.primary}
            />
          ) : available === true ? (
            <Check size={20} color="green" />
          ) : available === false ? (
            <X size={20} color="red" />
          ) : null}
        </div>

        {available === false && (
          <p className="text-red-500 text-sm">Username is not available</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <div className="flex gap-2 p-2 items-center w-full rounded-lg border">
          <Lock color="gray" size={18} />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className="border-0 outline-0 w-full"
            placeholder="*********"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {showPassword ? (
            <Eye
              onClick={togglePasswordVisibility}
              color="gray"
              size={20}
              className="cursor-pointer"
            />
          ) : (
            <EyeOff
              onClick={togglePasswordVisibility}
              color="gray"
              size={20}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="font-medium">
          Confirm Password
        </label>
        <div className="flex gap-2 p-2 items-center w-full rounded-lg border">
          <Lock color="gray" size={18} />
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            className="border-0 outline-0 w-full"
            placeholder="*********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showPassword ? (
            <Eye
              onClick={togglePasswordVisibility}
              color="gray"
              size={20}
              className="cursor-pointer"
            />
          ) : (
            <EyeOff
              onClick={togglePasswordVisibility}
              color="gray"
              size={20}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Error / Success */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm text-center">
          Account created successfully!
        </p>
      )}

      {/* Sign Up Button */}
      <CommonButton
        text={loading ? 'Creating...' : 'Create Account'}
        borderColor={colors.primaryDark}
        bgColor={colors.primary}
        size="md"
        rounded="md"
        type="submit"
      />

      <p className="text-xs text-gray-700 text-center">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
};

export default Signup;
