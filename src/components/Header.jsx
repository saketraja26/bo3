import aarohanLogo from "../assets/aarohan.png";
import dvLogo from "../assets/dv.png";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full  bg-transparent text-white flex items-center justify-between px-6 py-3  z-50">
      <img src={aarohanLogo} alt="Aarohan Logo" className="h-12 md:h-16" />
      <h1 className="text-lg md:text-2xl font-bold text-center flex-1">
        Valorant Tournament Map Veto
      </h1>
      <img src={dvLogo} alt="DV Logo" className="h-12 md:h-16" />
    </header>
  );
}