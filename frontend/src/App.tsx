import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import Standings from "./pages/Standings";
import { useState } from "react";
import { classes } from "./constants/classes";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import type { PredictionUI } from "./typings/interfaces";
import type { SingleBet, User } from "../../shared";
import {
  LeaguesContext,
  AuthContext,
  PredictionContext,
  BetsContext,
} from "./context";

export default function App() {
  const [cache, setCache] = useState<Record<string, any>>({});
  const [auth, setAuth] = useState<User | null>(null);
  const [predictions, setPredictions] = useState<PredictionUI[] | null>(null);
  const [userBets, setUserBets] = useState<SingleBet[] | null>(null);

  return (
    <LeaguesContext.Provider value={{ cache, setCache }}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <PredictionContext.Provider value={{ predictions, setPredictions }}>
          <BetsContext.Provider value={{ userBets, setUserBets }}>
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
          </BetsContext.Provider>
        </PredictionContext.Provider>
      </AuthContext.Provider>
    </LeaguesContext.Provider>
  );
}
