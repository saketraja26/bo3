import { useState, useEffect } from "react";
import { maps } from "../data/maps";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function VetoProcess({ teamA, teamB, tossWinner }) {
  // --- STATE VARIABLES ---
  const [bannedMaps, setBannedMaps] = useState([]);
  const [pickedMaps, setPickedMaps] = useState([]);
  const [attackerDefender, setAttackerDefender] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  // --- SEQUENCE OF VETO PROCESS STEPS ---
  const stepSequence = [
    { action: "ban", team: tossWinner },
    { action: "ban", team: tossWinner === teamA ? teamB : teamA },
    { action: "pick", team: tossWinner },
    { action: "choose", team: tossWinner === teamA ? teamB : teamA },
    { action: "pick", team: tossWinner === teamA ? teamB : teamA },
    { action: "choose", team: tossWinner },
    { action: "ban", team: tossWinner },
    { action: "ban", team: tossWinner === teamA ? teamB : teamA },
    { action: "auto-pick", team: "System" },
    { action: "choose", team: tossWinner === teamA ? teamB : teamA },
  ];

  const currentAction = stepSequence[currentStep];
  const currentTeam = currentAction?.team || ""; // ✅ Ensure `currentTeam` is defined
  
  // --- FILTER AVAILABLE MAPS ---
  const availableMaps = maps.filter(
    (map) => !bannedMaps.includes(map.name) && !pickedMaps.includes(map.name)
  );
  
useEffect(() => {
  if (currentStep === 8) {
    setTimeout(() => { // ✅ Ensures state updates first
      const updatedAvailableMaps = maps.filter(
        (map) => !bannedMaps.includes(map.name) && !pickedMaps.includes(map.name)
      );

      if (updatedAvailableMaps.length === 1) {
        handleAction(updatedAvailableMaps[0], "auto-pick");
      }
    }, 100); // ✅ Small delay to allow state to update
  }
}, [currentStep, bannedMaps, pickedMaps]);

  

  // --- HANDLE ACTION BASED ON CURRENT STEP ---
  const handleAction = (map, action) => {
    if (action === "ban") {
      console.log(`Step ${currentStep + 1}: ${currentTeam} bans ${map.name}`);
      setBannedMaps((prev) => [...prev, map.name]);
    } else if (action === "pick") {
      console.log(`Step ${currentStep + 1}: ${currentTeam} picks ${map.name}`);
      setPickedMaps((prev) => [...prev, map.name]);
    } else if (action === "choose") {
      const lastPickedMap = pickedMaps[pickedMaps.length - 1];

      if (lastPickedMap) {
        console.log(
          `Step ${currentStep + 1}: ${currentTeam} chooses ${map} for ${lastPickedMap}`
        );

        setAttackerDefender((prev) => ({
          ...prev,
          [lastPickedMap]: {
            map: lastPickedMap,
            attacker: map === "Attack" ? currentTeam : teamA === currentTeam ? teamB : teamA,
            defender: map === "Defense" ? currentTeam : teamA === currentTeam ? teamB : teamA,
          },
        }));
      }
    } else if (action === "auto-pick") {
      const updatedAvailableMaps = maps.filter(
        (map) => !bannedMaps.includes(map.name) && !pickedMaps.includes(map.name)
      );
    
      if (updatedAvailableMaps.length > 0) { //  Prevents empty array error
        const lastMap = updatedAvailableMaps[0]; // Pick the first remaining map
        console.log(`Step ${currentStep + 1}: ${lastMap.name} is auto-picked`);
        setPickedMaps((prev) => [...prev, lastMap.name]);
      } else {
        console.log("No maps left to auto-pick!"); // Debugging log
      }
    }
    

    setCurrentStep((prev) => prev + 1);
  };

  const navigate = useNavigate();

  // --- TRACK PICKED MAPS ---
  useEffect(() => {
    console.log("Updated Picked Maps:", pickedMaps);
  }, [pickedMaps]);

  // --- TRACK ATTACKER/DEFENDER CHOICES ---
  useEffect(() => {
    console.log("Updated Attacker/Defender Assignments:", attackerDefender);
  }, [attackerDefender]);

  // --- FINAL NAVIGATION AFTER VETO COMPLETION ---
  useEffect(() => {
    if (currentStep >= stepSequence.length) {
      setTimeout(() => { // ✅ Ensure navigation happens after state updates
        console.log("Final Veto Results:");
        console.log("Picked Maps:", pickedMaps);
        console.log("Attacker/Defender Assignments:", attackerDefender);
    
        navigate("/results", { state: { pickedMaps, attackerDefender } });
      }, 100);
    }
  }, [currentStep, navigate]);

  // --- UI RENDERING BASED ON CURRENT STEP ---
  return (
    
    <div className="text-center">
      <Header /> {/* Add this line */}
      <h2 className="text-3xl font-bold mb-6 text-white">{currentTeam}'s Turn</h2>

      {currentStep === 0 || currentStep === 1 || currentStep === 6 || currentStep === 7 ? (
        <BanPhase availableMaps={availableMaps} handleAction={handleAction} />
      ) : currentStep === 2 || currentStep === 4 ? (
        <PickPhase availableMaps={availableMaps} handleAction={handleAction} />
      ) : currentStep === 3 || currentStep === 5 ? (
        <AttackDefenseChoice currentTeam={currentTeam} pickedMaps={pickedMaps} handleAction={handleAction} />
      ) : currentStep === 8 ? (
        <AutoSelectPhase availableMaps={availableMaps} handleAction={handleAction} />
      ) : (
        <FinalAttackDefenseChoice currentTeam={currentTeam} pickedMaps={pickedMaps} handleAction={handleAction} />
      )}
    </div>
  );
}

// =====================================================
//                        PHASES
// =====================================================

// --- BAN PHASE ---
const BanPhase = ({ availableMaps, handleAction }) => (
  <div>
    <p className="mb-4 text-lg">
      Select a map to <span className="font-bold text-red-400">BAN</span>:
    </p>
    <div className="flex flex-wrap justify-center gap-6">
      {availableMaps.map((map) => (
        <button
          key={map.name}
          className="relative w-60 h-36 rounded-lg overflow-hidden hover:scale-105 transition-transform"
          onClick={() => handleAction(map, "ban")}
        >
          <img src={map.image} alt={map.name} className="w-full h-full object-cover" />
          <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-bold text-lg">
            {map.name}
          </span>
        </button>
      ))}
    </div>
  </div>
);

// --- PICK PHASE ---
const PickPhase = ({ availableMaps, handleAction }) => (
  <div>
    <p className="mb-4 text-lg">
      Select a map to <span className="font-bold text-green-400">PICK</span>:
    </p>
    <div className="flex flex-wrap justify-center gap-6">
      {availableMaps.map((map) => (
        <button
          key={map.name}
          className="relative w-60 h-36 rounded-lg overflow-hidden hover:scale-105 transition-transform"
          onClick={() => handleAction(map, "pick")}
        >
          <img src={map.image} alt={map.name} className="w-full h-full object-cover" />
          <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-bold text-lg">
            {map.name}
          </span>
        </button>
      ))}
    </div>
  </div>
);

// --- ATTACK/DEFENSE CHOICE ---
const AttackDefenseChoice = ({ currentTeam, pickedMaps, handleAction }) => (
  <div>
    <p className="mb-4 text-lg">
      {currentTeam}, choose <span className="font-bold text-yellow-300">Attack or Defense</span> for{" "}
      <span className="font-bold">{pickedMaps[pickedMaps.length - 1]}</span>:
    </p>
    <div className="flex gap-6 justify-center">
      <button className="bg-yellow-500 px-6 py-3 text-white font-bold rounded-lg" onClick={() => handleAction("Attack", "choose")}>
        Attack
      </button>
      <button className="bg-blue-500 px-6 py-3 text-white font-bold rounded-lg" onClick={() => handleAction("Defense", "choose")}>
        Defense
      </button>
    </div>
  </div>
);
const AutoSelectPhase = ({ availableMaps, handleAction }) => (
  <div>
    <p className="mb-4 text-lg">System is automatically selecting the last remaining map...</p>
    {availableMaps.length > 0 ? (
      <button 
        className="bg-gray-500 px-6 py-3 text-white font-bold rounded-lg mt-4" 
        onClick={() => handleAction(availableMaps[0], "auto-pick")}
      >
        Auto-Pick {availableMaps[0]?.name}
      </button>
    ) : (
      <p className="text-red-500 font-bold">No maps available to auto-pick!</p>
    )}
  </div>
);
const FinalAttackDefenseChoice = ({ currentTeam, pickedMaps, handleAction }) => (
  <div>
    <p className="mb-4 text-lg">
      {currentTeam}, choose <span className="font-bold text-yellow-300">Attack or Defense</span> for{" "}
      <span className="font-bold">{pickedMaps[pickedMaps.length - 1]}</span>:
    </p>
    <div className="flex gap-6 justify-center">
      <button className="bg-yellow-500 px-6 py-3 text-white font-bold rounded-lg" onClick={() => handleAction("Attack", "choose")}>
        Attack
      </button>
      <button className="bg-blue-500 px-6 py-3 text-white font-bold rounded-lg" onClick={() => handleAction("Defense", "choose")}>
        Defense
      </button>
    </div>
  </div>
);
