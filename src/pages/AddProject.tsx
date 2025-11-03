/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Globe,
  Lock,
  MoveLeft,
  Square,
  SquareCheck,
  Users,
  Users2,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../app/store';
import { createProject } from '../services/projectService';
import { getTeams } from '../services/teamService';
import type { TeamResponse } from '../types';

const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'] as const;
const VISIBILITY_OPTIONS = [
  { value: 'public', label: 'Public', icon: <Globe size={16} /> },
  { value: 'private', label: 'Private', icon: <Lock size={16} /> },
  { value: 'team', label: 'Team', icon: <Users2 size={16} /> },
] as const;

export const AddProject = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priority: '' as 'Low' | 'Medium' | 'High' | '',
    visibility: 'public' as 'public' | 'private' | 'team',
    startDate: '',
    dueDate: '',
  });

  const selectedTeam = useMemo(
    () => teams.find((t) => t.id === selectedTeamId),
    [teams, selectedTeamId]
  );

  const teamMembers = selectedTeam?.members || [];

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await getTeams(currentUser.id);
        setTeams(res);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      }
    };
    fetchTeams();
  }, [currentUser]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberToggle = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedMembers((prev) =>
      prev.length === teamMembers.length
        ? []
        : teamMembers.map((m) => String(m.id))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.priority || !selectedTeamId) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      creatorId: currentUser?.id,
      teamId: selectedTeamId,
      collaboratorIds: selectedMembers,
      status: 'PENDING',
      priority: formData.priority.toUpperCase(),
      visibility: formData.visibility.toUpperCase(),
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      dueDate: formData.dueDate
        ? new Date(formData.dueDate).toISOString()
        : null,
    };
    console.log(payload);
    try {
      await createProject(payload);
      toast.success('Project created successfully!');
      navigate('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project.');
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6 w-full relative">
      <button
        onClick={() => navigate(-1)}
        type="button"
        className="flex items-center gap-2 px-4 py-2 my-4 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-colors shadow-sm"
      >
        <MoveLeft className="text-gray-700 dark:text-gray-300" size={20} />
        <span className="text-gray-800 dark:text-gray-200 font-medium">
          Go Back
        </span>
      </button>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Text Fields */}
        {[
          {
            id: 'name',
            label: 'Project Name',
            type: 'text',
            placeholder: 'e.g., Marketing Dashboard',
          },
          {
            id: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Briefly describe your project...',
          },
        ].map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                name={field.id}
                value={(formData as any)[field.id]}
                onChange={handleInputChange}
                rows={3}
                placeholder={field.placeholder}
                className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 
                bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none 
                focus:ring-2 focus:ring-blue-500 transition"
              />
            ) : (
              <input
                type="text"
                id={field.id}
                name={field.id}
                value={(formData as any)[field.id]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 
                bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none 
                focus:ring-2 focus:ring-blue-500 transition"
              />
            )}
          </div>
        ))}

        {/* Team Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Team
          </label>
          <select
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 
            dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Choose a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 
            bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none 
            focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select priority</option>
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Members */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Members
            </label>
            {selectedTeamId && teamMembers.length > 0 && (
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-sm"
              >
                {selectedMembers.length === teamMembers.length ? (
                  <SquareCheck size={20} />
                ) : (
                  <Square size={20} />
                )}
              </button>
            )}
          </div>

          <div
            className={`flex flex-wrap gap-2 bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-gray-300 dark:border-zinc-700 transition ${
              !selectedTeamId ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            {teamMembers.length ? (
              teamMembers.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleMemberToggle(String(m.id))}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedMembers.includes(String(m.id))
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600'
                  }`}
                >
                  <Users size={14} className="inline mr-1" />
                  {m.fullName}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                {selectedTeamId ? 'No members found.' : 'Select a team first.'}
              </p>
            )}
          </div>
        </div>

        {/* Visibility */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Visibility
          </label>
          <div className="flex gap-3">
            {VISIBILITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, visibility: opt.value }))
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                  formData.visibility === opt.value
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700'
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dates */}
        {['startDate', 'dueDate'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field === 'startDate' ? 'Start Date' : 'Due Date'}
            </label>
            <input
              type="date"
              name={field}
              value={(formData as any)[field]}
              onChange={handleInputChange}
              className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 
              bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none 
              focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        ))}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl shadow-md transition-all duration-200"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};
