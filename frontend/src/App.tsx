import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import Standings from "./pages/Standings";
import { createContext, useState } from "react";
import { classes } from "./constants/classes";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import type { PredictionContextType } from "./typings/interfaces";
import type { PredictionInterface } from "../../shared/typings/atomics";

export const LeaguesContext = createContext<any>(null);
export const AuthContext = createContext<any>(null);
export const PredictionCache = createContext<PredictionContextType>({
  predictions: [],
  setPredictions: () => {},
});

export default function App() {
  const [cache, setCache] = useState<Record<string, any>>({});
  const [logged, setLogged] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<PredictionInterface[]>([]);

  return (
    <LeaguesContext.Provider value={{ cache, setCache }}>
      <AuthContext.Provider value={{ logged, setLogged }}>
        <PredictionCache.Provider value={{ predictions, setPredictions }}>
          <main>
            <Navbar />
            <div className={classes.main}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/standings" element={<Standings />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
            <Footer />
          </main>
        </PredictionCache.Provider>
      </AuthContext.Provider>
    </LeaguesContext.Provider>
  );
}
