/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from 'lucide-react';

import { UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { Avatar } from '../components/ui/Avatar';
import { inviteUserToPlatform } from '../services/invitationService';
import { searchUsers } from '../services/userService';
import type { UserType } from '../types';

export const InviteMemberPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce search input (delay 500ms)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch users when debouncedQuery changes
  useEffect(() => {
    const fetchUsers = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await searchUsers(debouncedQuery, currentUser.id);
        console.log('res', res);
        setResults(res);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser.id, debouncedQuery]);

  const handleInvite = async (user: UserType) => {
    // Save old results in case we need to revert
    const oldResults = [...results];

    // Optimistically update UI
    setResults((prev) =>
      prev.map((u) =>
        u.email === user.email ? { ...u, invitationStatus: 'PENDING' } : u
      )
    );

    try {
      const response = await inviteUserToPlatform(currentUser.id, user.email);
      toast.success(response);
    } catch (err: any) {
      toast.error('Failed to invite user');
      setResults(oldResults); // rollback
    }
  };

  return (
    <div className="flex flex-col p-4">
      {/*  Search Bar */}
      <div className="flex items-center gap-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-xl px-3 py-2 shadow-sm">
        <Search className="text-gray-500 dark:text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users to invite..."
          className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Searching users...
        </div>
      )}

      {/* User Results */}
      {!loading && results.length > 0 && (
        <div className="mt-5 flex flex-col gap-3 animate-fadeIn">
          {results.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center border border-gray-200 dark:border-zinc-700 rounded-xl p-3 bg-gray-50 dark:bg-zinc-800 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                {!user.avatar ? (
                  <Avatar name={user.fullName} size={20} />
                ) : (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-zinc-600"
                  />
                )}
                <div>
                  <span className="font-medium text-gray-800 dark:text-gray-100 block">
                    {user.fullName}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </span>
                </div>
              </div>

              {user.invitationStatus === 'PENDING' ? (
                <span className="text-sm text-yellow-600 font-medium">
                  Requested
                </span>
              ) : user.invitationStatus === 'ACCEPTED' ? (
                <span className="text-sm text-green-600 font-medium">
                  Member
                </span>
              ) : (
                <button
                  onClick={() => handleInvite(user)}
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg shadow-sm transition-all"
                >
                  <UserPlus size={16} />
                  Invite
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && debouncedQuery && results.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-6">
          No users found.
        </div>
      )}
    </div>
  );
};
