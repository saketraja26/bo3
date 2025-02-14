import { useState } from "react";
import TeamSelection from "../components/TeamSelection";
import Toss from "../components/Toss";
import VetoProcess from "../components/VetoProcess";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Veto() {
  const [teams, setTeams] = useState(null);
  const [tossWinner, setTossWinner] = useState("");
  const [vetoResult, setVetoResult] = useState(null);
  const navigate = useNavigate();

  const handleVetoComplete = (result) => {
    setVetoResult(result);
    setTimeout(() => {
      navigate("/results", { state: { vetoResult: result, teams } });
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <Header />
      <h1 className="text-3xl font-bold mb-4">Valorant Veto Process</h1>

      {!teams ? (
        <TeamSelection onTeamsSelected={(teamA, teamB) => setTeams({ teamA, teamB })} />
      ) : !tossWinner ? (
        <Toss teamA={teams.teamA} teamB={teams.teamB} onTossResult={setTossWinner} />
      ) : !vetoResult ? (
        <VetoProcess teamA={teams.teamA} teamB={teams.teamB} tossWinner={tossWinner} onVetoComplete={handleVetoComplete} />
      ) : (
        <p className="text-lg font-semibold">Finalizing veto results...</p>
      )}
    </div>
  );
}
