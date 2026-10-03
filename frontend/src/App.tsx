import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import Standings from "./pages/Standings";
import { createContext, useState } from "react";

export const LeaguesCache = createContext<any>(null);

export default function App() {
  const [cache, setCache] = useState<Record<string, any>>({});

  return (
    <LeaguesCache.Provider value={{ cache, setCache }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
      <Footer />
    </LeaguesCache.Provider>
  );
}
