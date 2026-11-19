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
import type {
  AuthContextType,
  PredictionContextType,
  PredictionUI,
} from "./typings/interfaces";
import type { User } from "../../shared";

export const LeaguesContext = createContext<any>(null);
export const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
});
export const PredictionContext = createContext<PredictionContextType>({
  predictions: null,
  setPredictions: () => {},
});

export default function App() {
  const [cache, setCache] = useState<Record<string, any>>({});
  const [auth, setAuth] = useState<User | null>(null);
  const [predictions, setPredictions] = useState<PredictionUI[] | null>(null);

  return (
    <LeaguesContext.Provider value={{ cache, setCache }}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <PredictionContext.Provider value={{ predictions, setPredictions }}>
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
        </PredictionContext.Provider>
      </AuthContext.Provider>
    </LeaguesContext.Provider>
  );
}
