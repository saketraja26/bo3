import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      <h1 className="text-4xl font-bold text-yellow-400">Valorant Veto System</h1>
      <p className="text-lg mt-2">Select teams and start the veto process!</p>
      <Link to="/veto" className="mt-5 bg-red-500 px-6 py-2 text-white rounded-lg">
        Start Veto
      </Link>
    </div>
  );
}
