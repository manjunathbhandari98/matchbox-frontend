/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from '../../app/store';
import colors from '../../constants/colors';
import {
  authFailure,
  loginSuccess,
  setUserInfo,
  startLoading,
} from '../../redux/authSlice';
import { loginUser } from '../../services/authService';
import { getUserInfo } from '../../services/userService';
import CommonButton from '../ui/CommonButton';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'USER',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field error as user types
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    dispatch(startLoading());
    try {
      const res = await loginUser(formData);
      toast.success('Login Successful');
      dispatch(loginSuccess({ token: res.token }));
      const user = await getUserInfo(res.email);
      dispatch(setUserInfo(user));
      navigate('/dashboard');
    } catch (error: any) {
      console.error(error);
      toast.error('Login Failed!');
      dispatch(authFailure(error.message || 'Login Failed'));
    }
  };

  return (
    <div className="w-full p-4">
      {loading && <p>Logging in...</p>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <div
            className={`flex gap-2 p-2 items-center w-full rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <Mail color="gray" size={18} />
            <input
              type="text"
              className="border-0 outline-0 w-full"
              name="email"
              placeholder="johndoe@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <div
            className={`flex gap-2 p-2 items-center w-full rounded-lg border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <Lock color="gray" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              className="border-0 outline-0 w-full"
              name="password"
              placeholder="*********"
              value={formData.password}
              onChange={handleChange}
            />
            {showPassword ? (
              <Eye onClick={togglePasswordVisibility} color="gray" size={20} />
            ) : (
              <EyeOff
                onClick={togglePasswordVisibility}
                color="gray"
                size={20}
              />
            )}
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2 items-center text-gray-500">
            <input type="checkbox" name="remember" id="remember" />
            <label htmlFor="remember" className="text-[14px] font-medium">
              Remember Me
            </label>
          </div>
          <Link
            to={'/forgot-password'}
            className="text-[14px] font-medium"
            style={{ color: colors.primary }}
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <CommonButton
          text="Login"
          borderColor={colors.primaryDark}
          bgColor={colors.primary}
          size="md"
          rounded="md"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Login;
