import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import Standings from "./pages/Standings";
import { createContext, useState } from "react";
import { classes } from "./constants/classes";

export const LeaguesCache = createContext<any>(null);

export default function App() {
  const [cache, setCache] = useState<Record<string, any>>({});

  return (
    <LeaguesCache.Provider value={{ cache, setCache }}>
      <main>
        <Navbar />
        <div className={classes.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/standings" element={<Standings />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </LeaguesCache.Provider>
  );
}
