import { motion } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import colors from '../../constants/colors';
import {
  addTeamMember,
  getTeamById,
  removeTeamMember,
  updateMemberRole,
} from '../../services/teamService';
import type { MemberResponse, TeamResponse, UserType } from '../../types';
import { Avatar } from '../ui/Avatar';
import CommonButton from '../ui/CommonButton';

interface ManageMembersModalProps {
  teamId: string;
  onClose: () => void;
  allUsers: UserType[];
  onUpdated?: (updatedTeam: TeamResponse) => void;
}

export const ManageMembersModal = ({
  teamId,
  onClose,
  allUsers,
  onUpdated,
}: ManageMembersModalProps) => {
  const [members, setMembers] = useState<MemberResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [newMember, setNewMember] = useState<{
    memberId: string;
    role: string;
  }>({
    memberId: '',
    role: 'DEVELOPER',
  });

  const teamRoles = ['TEAM_LEAD', 'DEVELOPER', 'DESIGNER', 'TESTER', 'MANAGER'];

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const data = await getTeamById(teamId);
        setMembers(data.members);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch members');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [teamId]);

  // Remove Member
  const handleRemove = async (memberId: string) => {
    try {
      await removeTeamMember(teamId, memberId);
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      toast.success('Member removed');
      const updatedTeam = await getTeamById(teamId);
      if (onUpdated) onUpdated(updatedTeam);
    } catch (error) {
      console.error(error);
      toast.error('Failed to remove member');
    }
  };

  // Update Role
  const handleRoleChange = async (memberId: string, teamRole: string) => {
    try {
      await updateMemberRole(teamId, memberId, teamRole);
      setMembers((prev) =>
        prev.map((m) =>
          m.id === memberId
            ? { ...m, teamRole: teamRole as MemberResponse['teamRole'] }
            : m
        )
      );
      toast.success('Role updated');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update role');
    }
  };

  // Add Member
  const handleAddMember = async () => {
    if (!newMember.memberId) return toast.error('Please select a member');
    try {
      const data = await addTeamMember(teamId, newMember);
      setMembers((prev) => [...prev, data]);
      setNewMember({ memberId: '', role: 'DEVELOPER' });
      setQuery('');
      toast.success('Member added');
      const updatedTeam = await getTeamById(teamId);
      if (onUpdated) onUpdated(updatedTeam);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add member');
    }
  };

  // Filter available users (not already in the team)
  const filteredUsers = allUsers.filter(
    (m) =>
      m.email?.toLowerCase().includes(query.toLowerCase()) ||
      m.username?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Manage Team Members
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Current Members */}
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={member?.fullName} />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      {member.fullName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {member.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={member.teamRole}
                    onChange={(e) =>
                      handleRoleChange(member.id, e.target.value)
                    }
                    className="border rounded-lg p-1 dark:bg-zinc-700 dark:text-gray-100"
                  >
                    {teamRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleRemove(member.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {/* Add Member Section */}
            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-xl mt-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
                Add New Member
              </h3>

              {/* Search */}
              <input
                type="text"
                placeholder="Search by username or email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
              />

              {query && (
                <ul className="max-h-40 overflow-y-auto border rounded-md dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 mb-3">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <li
                        key={u.id}
                        onClick={() =>
                          setNewMember((p) => ({ ...p, memberId: u.id }))
                        }
                        className={`p-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 ${
                          newMember.memberId === u.id
                            ? 'bg-blue-200 dark:bg-blue-800'
                            : ''
                        }`}
                      >
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {u.fullName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {u.email || u.username}
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

              {/* Role Selector */}
              <select
                value={newMember.role}
                onChange={(e) =>
                  setNewMember((prev) => ({ ...prev, role: e.target.value }))
                }
                className="w-full p-2 border rounded-md dark:bg-zinc-700 dark:text-gray-100"
              >
                {teamRoles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {/* Add Button */}
              <div className="flex justify-end mt-3">
                <CommonButton
                  text="Add Member"
                  size="md"
                  bgColor={colors.primary}
                  borderColor={colors.primaryDark}
                  onClick={handleAddMember}
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
