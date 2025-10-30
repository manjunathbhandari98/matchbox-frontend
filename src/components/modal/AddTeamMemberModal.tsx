import { motion } from 'framer-motion';
import { useState } from 'react';
import type { UserType } from '../../types';

type AddTeamMemberModalProps = {
  onAdd: () => void;
  onCancel: () => void;
  members: UserType[];
  newMember: { id: string; role: string };
  setNewMember: React.Dispatch<
    React.SetStateAction<{ id: string; role: string }>
  >;
};

export const AddTeamMemberModal = ({
  onAdd,
  onCancel,
  members,
  newMember,
  setNewMember,
}: AddTeamMemberModalProps) => {
  const [query, setQuery] = useState('');

  // Filter members by email or username
  const filteredMembers = members.filter(
    (m) =>
      m.email?.toLowerCase().includes(query.toLowerCase()) ||
      m.username?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6 w-full max-w-md relative"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Add Member
        </h2>

        <div className="space-y-4">
          {/* Search Input */}
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Search by Email or Username
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Filtered Members List */}
          {query && (
            <ul className="max-h-48 overflow-y-auto border rounded-md dark:border-gray-700 bg-gray-50 dark:bg-zinc-800">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((m) => (
                  <li
                    key={m.id}
                    onClick={() =>
                      setNewMember((prev) => ({ ...prev, id: m.id }))
                    }
                    className={`p-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 ${
                      newMember.id === m.id
                        ? 'bg-blue-200 dark:bg-blue-800'
                        : ''
                    }`}
                  >
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {m.fullName || `${m.fullName}`}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {m.email || m.username}
                    </p>
                  </li>
                ))
              ) : (
                <li className="p-2 text-sm text-gray-500 dark:text-gray-400">
                  No results found
                </li>
              )}
            </ul>
          )}

          {/* Role Selection */}
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300">
              Role
            </label>
            <select
              value={newMember.role}
              onChange={(e) =>
                setNewMember((prev) => ({ ...prev, role: e.target.value }))
              }
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
            >
              <option value="TEAM_LEAD">Team Lead</option>
              <option value="DEVELOPER">Developer</option>
              <option value="DESIGNER">Designer</option>
              <option value="TESTER">Tester</option>
              <option value="MANAGER">Manager</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            disabled={!newMember.id}
            className={`px-4 py-2 rounded-md text-white ${
              newMember.id
                ? 'bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            Add
          </button>
        </div>
      </motion.div>
    </div>
  );
};
