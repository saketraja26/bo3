import { useLocation, Link } from "react-router-dom";
import { maps } from "../data/maps";
import Header from "../components/Header";


export default function Results() {
  const location = useLocation();
  const { pickedMaps = [], attackerDefender = {} } = location.state || {}; // ✅ Ensure fallback values

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <Header />
      <h1 className="text-3xl font-bold mb-6">Match Results</h1>

      {pickedMaps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pickedMaps.map((mapName, index) => {
            const map = maps.find((m) => m.name === mapName);
            const attackDefendInfo = attackerDefender[mapName] || {};

            const attackingTeam = attackDefendInfo.attacker || "Unknown";
            const defendingTeam = attackDefendInfo.defender || "Unknown";

            return (
              <div key={index} className="flex flex-col items-center">
                {/* Map Image with Overlay */}
                <div className="relative w-96 h-56">
                  <img
                    src={map?.image || "default-image.jpg"}
                    alt={mapName}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
                    <h2 className="text-xl font-bold text-center">{mapName}</h2>
                  </div>
                </div>

                {/* Attack & Defense Info */}
                <p className="mt-4 text-lg text-red-400 font-semibold">
                  {attackingTeam} starts as <span className="font-bold">Attack</span>
                </p>
                <p className="text-lg text-blue-400 font-semibold">
                  {defendingTeam} starts as <span className="font-bold">Defense</span>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-lg">No match results available.</p>
      )}

      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
