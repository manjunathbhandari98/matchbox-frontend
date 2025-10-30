/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { AddTeamMemberModal } from '../components/modal/AddTeamMemberModal';
import { getAllInvitedMembers } from '../services/invitationService';
import { createTeam } from '../services/teamService';
import type { TeamRequest, TeamRole, UserType } from '../types';

const CreateTeamPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [team, setTeam] = useState<TeamRequest>({
    name: '',
    description: '',
    avatar: '',
    createdBy: currentUser.id,
    members: [{ id: currentUser.id, role: 'TEAM_LEAD' }],
  });

  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState({ id: '', role: 'DEVELOPER' });
  const [members, setMembers] = useState<UserType[]>([]);

  // Fetch accepted members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getAllInvitedMembers(currentUser.id);
        const activeMembers = data.filter(
          (m: UserType) => m.invitationStatus === 'ACCEPTED'
        );

        // Include self as TEAM_LEAD
        const withSelf = [
          ...activeMembers,
          { ...currentUser, invitationStatus: 'SELF' },
        ];

        setMembers(withSelf);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMembers();
  }, [currentUser]);

  // Add new member with id and role
  const handleAddMember = () => {
    if (!newMember.id.trim()) return;
    if (team.members.some((m) => m.id === newMember.id)) return; // avoid duplicates

    setTeam((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        { id: newMember.id, role: newMember.role as TeamRole },
      ],
    }));

    setNewMember({ id: '', role: 'DEVELOPER' });
    setShowModal(false);
  };

  // Remove member properly
  const handleRemoveMember = (id: string) => {
    if (id === currentUser.id) {
      toast.error("You can't remove yourself from the team");
      return;
    }

    setTeam((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== id),
    }));
  };

  // Submit team
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createTeam(team);
      toast.success('Team created successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Error while creating team');
    }
  };

  return (
    <div className="p-6 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm transition-colors duration-300">
      <h1 className="text-2xl font-semibold mb-6 text-zinc-800 dark:text-gray-100">
        Create New Team
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Team Info */}
        <div>
          <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
            Team Name
          </label>
          <input
            type="text"
            placeholder="Enter team name"
            value={team.name}
            onChange={(e) => setTeam({ ...team, name: e.target.value })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            placeholder="Enter team description"
            value={team.description}
            onChange={(e) => setTeam({ ...team, description: e.target.value })}
            className="w-full p-2 border rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">
            Avatar URL
          </label>
          <input
            type="text"
            placeholder="https://..."
            value={team.avatar}
            onChange={(e) => setTeam({ ...team, avatar: e.target.value })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Members Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-gray-100">
              Members
            </h2>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition"
            >
              + Add Member
            </button>
          </div>

          {team.members.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No members added yet. Click “Add Member” to begin.
            </p>
          ) : (
            <ul className="space-y-2">
              {team.members.map((member, index) => {
                const user = members.find((m) => m.id === member.id);
                return (
                  <li
                    key={index}
                    className="flex justify-between items-center border p-2 rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {user ? user.fullName : 'Unknown User'}
                      </p>
                      {user?.email && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {user.email}
                        </p>
                      )}
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Team Role: {member.role}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-500 dark:text-red-400 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 dark:hover:bg-green-500 w-full font-medium transition"
        >
          Create Team
        </button>
      </form>

      {/* Add Member Modal */}
      {showModal && (
        <AddTeamMemberModal
          members={members}
          onAdd={handleAddMember}
          onCancel={() => setShowModal(false)}
          newMember={newMember}
          setNewMember={setNewMember}
        />
      )}
    </div>
  );
};

export default CreateTeamPage;
