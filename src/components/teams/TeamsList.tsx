import { ArrowRight, MoreVertical, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import type { Team } from '../../types';
import { Avatar } from '../ui/Avatar';

type TeamProps = {
  teams: Team[];
  onCreate?: () => void;
  onManageMembers?: (teamId: string) => void;
  onEdit?: (teamId: string) => void;
  onDelete?: (teamId: string) => void;
};

export const TeamsList = ({
  teams,
  onCreate,
  onManageMembers,
  onEdit,
  onDelete,
}: TeamProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (teamId: string) => {
    setOpenMenu(openMenu === teamId ? null : teamId);
  };

  // Empty state
  if (teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center p-6">
        <div className="bg-blue-100 dark:bg-blue-900/40 p-6 rounded-full mb-6 shadow-sm">
          <Users className="text-blue-600 dark:text-blue-400 w-10 h-10" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          No Teams Yet
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
          You don’t have any teams created yet. Start by adding your first team
          to collaborate and manage members effectively.
        </p>

        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-xl shadow-md transition-all duration-200"
          onClick={onCreate}
        >
          <UserPlus size={20} />
          <span>Create New Team</span>
        </button>
      </div>
    );
  }

  // Render teams
  return (
    <div className="grid sm:grid-cols-2 gap-5 relative">
      {teams.map((team: Team) => (
        <div
          key={team.id}
          className="relative bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              {team.avatar ? (
                <img
                  src={team.avatar}
                  alt={team.name}
                  className="w-12 h-12 rounded-xl object-cover border border-gray-300 dark:border-zinc-700"
                />
              ) : (
                <div className="bg-blue-600 w-12 h-12 text-white rounded-xl flex justify-center items-center">
                  <Users />
                </div>
              )}

              <div className="flex flex-col">
                <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  {team.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {team.description || 'No description'}
                </p>
              </div>
            </div>

            {/* More button */}
            <div className="relative">
              <MoreVertical
                size={20}
                className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                onClick={() => toggleMenu(team.id)}
              />

              {openMenu === team.id && (
                <div className="absolute right-0 top-6 w-44 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg z-20 animate-fadeIn">
                  <ul className="flex flex-col text-sm text-gray-900 dark:text-gray-200 font-medium">
                    <li
                      className="px-3 py-2 hover:bg-blue-400 hover:text-white rounded-lg cursor-pointer"
                      onClick={() => {
                        onManageMembers?.(team.id);
                        setOpenMenu(null);
                      }}
                    >
                      Manage Members
                    </li>
                    <li
                      className="px-3 py-2 hover:bg-blue-400 hover:text-white rounded-lg cursor-pointer"
                      onClick={() => {
                        onEdit?.(team.id);
                        setOpenMenu(null);
                      }}
                    >
                      Edit Team
                    </li>
                    <li
                      className="px-3 py-2 text-red-500 hover:bg-blue-400 hover:text-white rounded-lg cursor-pointer"
                      onClick={() => {
                        onDelete?.(team.id);
                        setOpenMenu(null);
                      }}
                    >
                      Delete Team
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Members */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex -space-x-2">
              {team.members.slice(0, 3).map((member, idx) => (
                <Avatar key={idx} name={member.fullName} />
              ))}
              {team.members.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-medium border-2 border-white">
                  +{team.members.length - 3}
                </div>
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <Users size={15} /> {team.members.length}
            </div>
          </div>

          {/* View Team Button */}
          <div
            className="group flex items-center gap-2 px-4 py-2 mt-4 bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-800 
             justify-center font-medium rounded-xl shadow-sm cursor-pointer 
             transition-all duration-300 text-gray-700 dark:text-gray-200
             hover:bg-gray-200 dark:hover:bg-zinc-600 hover:shadow-md active:scale-95"
          >
            <h2 className="text-sm sm:text-md tracking-wide">View Team</h2>
            <ArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
              size={18}
            />
          </div>
        </div>
      ))}

      {/* Add Team Card */}
      <div
        className="group flex flex-col items-center justify-center text-center gap-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 bg-white dark:bg-zinc-800 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-zinc-800 cursor-pointer"
        onClick={onCreate}
      >
        <div className="bg-blue-100 dark:bg-zinc-700 group-hover:bg-blue-200 text-blue-600 dark:text-blue-500 rounded-xl p-4 transition-colors duration-300">
          <UserPlus size={28} />
        </div>
        <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200 group-hover:text-blue-700 transition-colors duration-300">
          Create New Team
        </h2>
        <p className="text-sm text-gray-500 group-hover:text-gray-700">
          Add a new team to organize members
        </p>
      </div>
    </div>
  );
};
