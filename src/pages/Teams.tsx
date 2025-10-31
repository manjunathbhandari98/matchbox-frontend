import { Shield, UserPlus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../app/store';
import { MembersList } from '../components/teams/MembersList';
import { TeamsList } from '../components/teams/TeamsList';
import CommonButton from '../components/ui/CommonButton';
import { PageTitle } from '../components/ui/PageTitle';
import colors from '../constants/colors';
import { deleteTeam, getTeams } from '../services/teamService';
import type { TeamResponse } from '../types';
export const Teams = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const tabs = [
    { label: 'Teams', icon: <Users size={20} /> },
    { label: 'All Members', icon: <Shield size={20} /> },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [teams, setTeams] = useState<TeamResponse[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams(currentUser.id);
        setTeams(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeams();
  }, [currentUser]);

  const handleDeleteTeam = async (teamId: string) => {
    try {
      await deleteTeam(currentUser.id, teamId);
      toast.success('Team Deleted Successfully');
      setTeams((prevTeams) =>
        prevTeams.filter((team: TeamResponse) => team.id !== teamId)
      );
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete team');
    }
  };

  return (
    <div className="p-5 flex flex-col gap-6 bg-gray-50 dark:bg-zinc-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <PageTitle title="Teams" desc="Manage your teams and team members" />
        <CommonButton
          text={activeTab === 0 ? 'Add Team' : 'Add Member'}
          icon={<UserPlus />}
          borderColor={colors.primaryDark}
          bgColor={colors.primary}
          size="md"
          rounded="md"
          onClick={
            activeTab === 0
              ? () => navigate('/create-team')
              : () => navigate('/invite-member')
          }
        />
      </div>

      {/* Tabs */}
      <div className="flex py-1.5 px-2 gap-4 mr-auto bg-gray-200 dark:bg-zinc-700 rounded-lg">
        {tabs.map((tab, idx) => (
          <div
            key={idx}
            className={`flex gap-2 items-center cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === idx
                ? 'bg-gray-900 dark:bg-zinc-900 text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-200 dark:hover:bg-zinc-800 hover:bg-gray-300'
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.icon}
            <h2>{tab.label}</h2>
          </div>
        ))}
      </div>

      {/* Dynamic Content */}
      {activeTab === 0 ? (
        <TeamsList
          teams={teams}
          onCreate={() => navigate('/create-team')}
          onDelete={handleDeleteTeam}
          onUpdateTeam={(updatedTeam: TeamResponse) => {
            setTeams((prevTeams) =>
              prevTeams.map((team) =>
                team.id === updatedTeam.id ? updatedTeam : team
              )
            );
          }}
        />
      ) : (
        <MembersList />
      )}
    </div>
  );
};
