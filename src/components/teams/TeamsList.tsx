import { ArrowRight, MoreVertical, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import type { Team } from '../../types';
import { Avatar } from '../ui/Avatar';

type TeamProps = {
  teams: Team[];
};

export const TeamsList = ({ teams }: TeamProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (teamId: string) => {
    setOpenMenu(openMenu === teamId ? null : teamId);
  };

  return (
    <div className="grid sm:grid-cols-2 gap-5 relative">
      {teams.map((team: Team) => (
        <div
          key={team.teamId}
          className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="bg-blue-600 w-12 h-12 text-white rounded-xl flex justify-center items-center">
                <Users />
              </div>
              <div className="flex flex-col">
                <h2 className="font-semibold text-lg text-gray-800">
                  {team.teamName}
                </h2>
                <p className="text-sm text-gray-500">{team.teamRole}</p>
              </div>
            </div>

            {/* More button */}
            <div className="relative">
              <MoreVertical
                size={20}
                className="cursor-pointer text-gray-600 hover:text-gray-900"
                onClick={() => toggleMenu(team.teamId)}
              />

              {/* Dropdown menu */}
              {openMenu === team.teamId && (
                <div className="absolute right-0 top-6 w-50 py-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 animate-fadeIn">
                  <ul className="flex flex-col text-sm text-gray-900 font-medium">
                    <li
                      className="flex items-center rounded-lg mx-1 gap-2 px-3 py-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                      onClick={() => {
                        console.log('View Team:', team.teamName);
                        setOpenMenu(null);
                      }}
                    >
                      {' '}
                      Manage Memebers
                    </li>
                    <li
                      className="flex items-center rounded-lg mx-1 gap-2 px-3 py-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                      onClick={() => {
                        console.log('Edit:', team.teamName);
                        setOpenMenu(null);
                      }}
                    >
                      {' '}
                      Edit Team
                    </li>
                    <li
                      className="flex items-center text-red-500 rounded-lg mx-1 gap-2 px-3 py-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                      onClick={() => {
                        console.log('Delete:', team.teamName);
                        setOpenMenu(null);
                      }}
                    >
                      {' '}
                      Delete Team
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mt-2 mb-3">{team.description}</p>

          {/* Members */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex -space-x-2">
              {team.members.slice(0, 3).map((member, idx) => (
                <Avatar key={idx} name={member.name} size={8} />
              ))}
              {team.members.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-medium border-2 border-white">
                  +{team.members.length - 3}
                </div>
              )}
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-1">
              <Users size={15} /> {team.totalMembers}
            </div>
          </div>

          {/* View Team Button */}
          <div
            className="group flex items-center gap-2 px-4 py-2 mt-4 bg-gray-100 border border-gray-300 
             justify-center font-medium rounded-xl shadow-sm cursor-pointer 
             transition-all duration-300 text-gray-700
             hover:bg-gray-200 hover:shadow-md active:scale-95"
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
      <div className="group flex flex-col items-center justify-center text-center gap-3 border-2 border-dashed border-gray-300 rounded-2xl p-8 bg-white shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:bg-blue-50 cursor-pointer">
        <div className="bg-blue-100 group-hover:bg-blue-200 text-blue-600 rounded-xl p-4 transition-colors duration-300">
          <UserPlus size={28} />
        </div>
        <h2 className="font-semibold text-lg text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
          Create New Team
        </h2>
        <p className="text-sm text-gray-500 group-hover:text-gray-700">
          Add a new team to organize members
        </p>
      </div>
    </div>
  );
};
