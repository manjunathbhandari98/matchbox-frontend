import { MoreVertical, Search } from 'lucide-react';
import { useState } from 'react';
import type { Member, Team } from '../../types';
import { Avatar } from '../ui/Avatar';
import { PageTitle } from '../ui/PageTitle';

type TeamProps = {
  teams: Team[];
};

export const MembersList = ({ teams }: TeamProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenu, setOpenMenu] = useState<string | number | null>(null);

  // Flatten team members
  const allMembers = teams.flatMap((team: Team) =>
    team.members.map((m) => ({
      ...m,
      teamName: team.teamName,
      teamRole: team.teamRole,
    }))
  );

  // Filtered members based on search
  const filteredMembers = allMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = (id: string | number) => {
    setOpenMenu(openMenu == id ? null : id);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm rounded-xl px-3 py-2 w-full max-w-md">
        <Search size={18} className="text-gray-500 dark:text-gray-200" />
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none text-gray-700 dark:text-gray-200 text-sm bg-transparent"
        />
      </div>

      {/* Members List */}
      <div className="p-5 rounded-2xl border border-gray-100 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg transition-all duration-300">
        <PageTitle
          title="Team Members"
          desc="Manage all team members and their roles"
        />

        <div className="flex flex-col divide-y divide-gray-100 dark:divide-zinc-700 mt-4">
          {filteredMembers.map((member: Member, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center py-4 hover:bg-cyan-100/30  rounded-lg px-2 transition-all duration-200"
            >
              {/* Left: Avatar & Member Info */}
              <div className="flex items-center gap-4">
                <Avatar name={member.name} size={10} />
                <div className="flex flex-col">
                  <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                    {member.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {member.email}
                  </p>
                </div>
              </div>

              {/* Right: Badges & Actions */}
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 border border-gray-300 text-gray-700">
                  {member.role}
                </div>
                <div className="px-3 py-1.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                  Member
                </div>
                <div className="relative">
                  <MoreVertical
                    size={20}
                    className="cursor-pointer text-gray-600 dark:text-gray-200
                     hover:text-gray-900 dark:hover:text-gray-100"
                    onClick={() => toggleMenu(idx)}
                  />

                  {/* Dropdown menu */}
                  {openMenu === idx && (
                    <div className="absolute right-0 top-6 w-50 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg z-20 animate-fadeIn">
                      <ul className="flex flex-col text-sm text-gray-900 dark:text-gray-200 font-medium">
                        <li
                          className="flex items-center rounded-lg mx-1 gap-2 px-3 py-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                          onClick={() => {
                            setOpenMenu(null);
                          }}
                        >
                          {' '}
                          Change Role
                        </li>
                        <li
                          className="flex items-center rounded-lg mx-1 gap-2 px-3 py-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                          onClick={() => {
                            setOpenMenu(null);
                          }}
                        >
                          {' '}
                          Change Team
                        </li>
                        <li
                          className="flex items-center text-red-500 rounded-lg mx-1 gap-2 px-3 py-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                          onClick={() => {
                            setOpenMenu(null);
                          }}
                        >
                          {' '}
                          Remove Member
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No members found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
