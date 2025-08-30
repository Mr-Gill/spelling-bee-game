import React from 'react';
import { Participant } from '../types';

interface TeamFormProps {
  teams: Participant[];
  avatars: string[];
  addTeam: () => void;
  removeTeam: (index: number) => void;
  updateTeamName: (index: number, name: string) => void;
}

const TeamForm: React.FC<TeamFormProps> = ({
  teams,
  avatars,
  addTeam,
  removeTeam,
  updateTeamName,
}) => (
  <>
    {teams.map((team, index) => (
      <div key={index} className="flex items-center gap-2 mb-2">
        <img src={team.avatar || avatars[0]} alt="avatar" className="w-8 h-8 rounded-full" />
        <input
          type="text"
          value={team.name}
          onChange={e => updateTeamName(index, e.target.value)}
          placeholder={`Team ${index + 1} Name`}
          className="flex-grow p-2 rounded-md bg-white/20 text-white"
        />
        {teams.length > 1 && (
          <button
            onClick={() => removeTeam(index)}
            className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded"
          >
            Remove
          </button>
        )}
      </div>
    ))}
    <button onClick={addTeam} className="mt-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
      Add Team
    </button>
  </>
);

export default TeamForm;
