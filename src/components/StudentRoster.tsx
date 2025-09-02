import React, { useState } from 'react';
import { Participant, Team } from '../types';

interface StudentRosterProps {
  students: Participant[];
  avatars: string[];
  addParticipant: (p: Participant) => void;
  removeStudent: (index: number) => void;
  updateStudentName: (index: number, name: string) => void;
  createParticipant: (name: string, difficulty: number) => Participant;
  initialDifficulty: number;
  /** Optional list of teams for assigning students */
  teams?: Team[];
  /** Called when a student's team assignment changes */
  onAssignTeam?: (index: number, teamName: string) => void;
}

const StudentRoster: React.FC<StudentRosterProps> = ({
  students = [], // Default to empty array
  avatars,
  addParticipant,
  removeStudent,
  updateStudentName,
  createParticipant,
  initialDifficulty,
  teams = [],
  onAssignTeam,
}) => {
  const [studentName, setStudentName] = useState('');
  const [bulkStudentText, setBulkStudentText] = useState('');
  const [bulkStudentError, setBulkStudentError] = useState('');

  const addStudent = () => {
    if (studentName.trim()) {
      addParticipant(createParticipant(studentName, initialDifficulty));
      setStudentName('');
    }
  };

  const parseStudentNames = (text: string) =>
    text
      .split(/\r?\n/)
      .flatMap(line => line.split(','))
      .map(name => name.trim())
      .filter(name => name !== '');

  const addBulkStudents = () => {
    const names = parseStudentNames(bulkStudentText);
    const existing = new Set(students.map(s => s.name));
    const uniqueNames = Array.from(new Set(names)).filter(name => !existing.has(name));
    if (uniqueNames.length === 0) {
      setBulkStudentError('No new unique names detected.');
      return;
    }
    uniqueNames.forEach(name => addParticipant(createParticipant(name, initialDifficulty)));
    setBulkStudentText('');
    setBulkStudentError('');
  };

  return (
    <div className="student-roster">
      <h3>Participants</h3>
      {(students || []).map((student, index) => (
        <div key={index} className="participant-item">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={student.avatar || avatars[0]}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <input
              type="text"
              value={student.name}
              onChange={(e) => updateStudentName(index, e.target.value)}
              placeholder="Student name"
              className="flex-grow p-2 rounded-md bg-white/20 text-white"
              name={`student-name-${index}`}
            />
            {teams.length > 0 && (
              <select
                value={student.team || ''}
                onChange={(e) => onAssignTeam && onAssignTeam(index, e.target.value)}
                className="p-2 rounded-md bg-white/20 text-white"
                name={`student-team-${index}`}
              >
                <option value="">No Team</option>
                {teams.map((t, i) => (
                  <option key={i} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            )}
            {students.length > 0 && (
              <button
                onClick={() => removeStudent(index)}
                className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={studentName}
          onChange={e => setStudentName(e.target.value)}
          className="flex-grow p-2 rounded-md bg-white/20 text-white"
          placeholder="Student name"
        />
        <button
          onClick={addStudent}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold"
        >
          Add
        </button>
      </div>
      <div className="mb-4">
        <textarea
          value={bulkStudentText}
          onChange={e => setBulkStudentText(e.target.value)}
          className="w-full p-2 rounded-md bg-white/20 text-white mb-2"
          placeholder="Paste names, one per line or separated by commas"
          rows={4}
        ></textarea>
        <button
          onClick={addBulkStudents}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold"
        >
          Add Names
        </button>
        {bulkStudentError && <p className="text-red-300 mt-2">{bulkStudentError}</p>}
      </div>
    </div>
  );
};

export default StudentRoster;
