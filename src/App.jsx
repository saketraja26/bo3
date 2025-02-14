import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Veto from "./pages/Veto";
import Results from "./pages/Results";
import Layout from "./components/Layouts";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen text-white">
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veto" element={<Veto />} />
          <Route path="/results" element={<Results />} />
        </Routes>
        </Layout>
      </div>
    </Router>
  );
}