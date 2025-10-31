/* eslint-disable @typescript-eslint/no-unused-vars */
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import colors from '../../constants/colors';
import { getTeamById, updateTeam } from '../../services/teamService';
import type { TeamResponse } from '../../types';
import CommonButton from '../ui/CommonButton';

interface EditTeamProps {
  teamId: string;
  onClose: () => void;
  onUpdated?: (updatedTeam: TeamResponse) => void; // optional callback after successful update
}

export const EditTeamModal = ({
  teamId,
  onClose,
  onUpdated,
}: EditTeamProps) => {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing team data
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeamById(teamId);
        setTeamName(data.name);
        setDescription(data.description);
        setAvatar(data.avatar || '');
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeam();
  }, [teamId]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      setAvatar(URL.createObjectURL(e.target.files[0]));
      const updatedTeam = await getTeamById(teamId);
      if (onUpdated) onUpdated(updatedTeam);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', teamName);
      formData.append('description', description);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      } else if (avatar === '') {
        // Explicitly signal removal
        formData.append('avatar', '');
      }
      const updatedTeam = await updateTeam(teamId, formData);
      if (onUpdated) onUpdated(updatedTeam);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Edit Team
        </h2>

        <div className="flex flex-col gap-4">
          {/* Avatar Preview */}

          {avatar && (
            <div className="relative w-24 h-24 mx-auto mb-2">
              <img
                src={avatar}
                alt="Team Avatar"
                className="w-24 h-24 rounded-full object-cover border border-gray-300 dark:border-gray-700"
              />
              <button
                onClick={() => {
                  setAvatar('');
                  setAvatarFile(null);
                }}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                <X size={12} />
              </button>
            </div>
          )}

          {/* File Upload or URL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Team Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded-lg p-2 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 dark:border-zinc-700"
            />
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Or paste image URL"
              className="border rounded-lg p-2 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 dark:border-zinc-700"
            />
          </div>

          {/* Team Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Team Name
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full border rounded-lg p-2 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 dark:border-zinc-700"
              placeholder="Enter team name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-2 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800 dark:border-zinc-700"
              placeholder="Enter team description"
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <CommonButton text="Cancel" size="md" onClick={onClose} />
            <CommonButton
              text={loading ? 'Updating...' : 'Update'}
              bgColor={colors.primary}
              borderColor={colors.primaryDark}
              size="md"
              onClick={handleUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
