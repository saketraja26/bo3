import { useState } from "react";

export default function Toss({ teamA, teamB, onTossResult }) {
  const [winner, setWinner] = useState("");

  const handleToss = () => {
    const tossWinner = Math.random() < 0.5 ? teamA : teamB;
    setWinner(tossWinner);
    onTossResult(tossWinner);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">Toss</h2>
      <button onClick={handleToss} className="mt-3 bg-yellow-500 px-6 py-2 rounded-lg">
        Flip Coin
      </button>
      {winner && <p className="mt-3 text-lg font-semibold">{winner} won the toss!</p>}
    </div>
  );
}
