import { useState } from "react";

const teams = [
  "Ramadan Warriors ",
  "Mazhuda",
  "S1MPS",
  "Team Ace",
  "ARSE-NLS",
  "V3NOM毒",
  "Ignite Community ",
  "Champions",
  "Mystic monarchs",
  "TEAM KILLERS",
  "Blizzard",
  "Pookiebear Esports",
  "Pune rivals",
  "No Fear",
  "butter 5",
];

export default function TeamSelection({ onTeamsSelected }) {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");

  const handleSelection = () => {
    if (teamA && teamB) {
      onTeamsSelected(teamA, teamB);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white">Select Teams</h2>
      <div className="flex justify-center gap-5 mt-5">
        {/* Team A Selection */}
        <select
          value={teamA}
          onChange={(e) => setTeamA(e.target.value)}
          className="p-2 border rounded-lg bg-gray-800 text-white"
        >
          <option value="">Select Team A</option>
          {teams.map((team) => (
            <option key={team} value={team} disabled={teamB === team}>
              {team}
            </option>
          ))}
        </select>

        {/* Team B Selection */}
        <select
          value={teamB}
          onChange={(e) => setTeamB(e.target.value)}
          className="p-2 border rounded-lg bg-gray-800 text-white"
        >
          <option value="">Select Team B</option>
          {teams.map((team) => (
            <option key={team} value={team} disabled={teamA === team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSelection}
        className="mt-5 bg-blue-500 px-6 py-2 text-white rounded-lg"
        disabled={!teamA || !teamB}
      >
        Confirm Teams
      </button>
    </div>
  );
}
