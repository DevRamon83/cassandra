import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import Standings from "./pages/Standings";
import { createContext, useState } from "react";
import { classes } from "./constants/classes";
import Auth from "./pages/Auth";

export const LeaguesCache = createContext<any>(null);
export const AuthContext = createContext<any>(null);

export default function App() {
  const [cache, setCache] = useState<Record<string, any>>({});
  const [logged, setLogged] = useState<string | null>(null);

  return (
    <LeaguesCache.Provider value={{ cache, setCache }}>
      <AuthContext.Provider value={{ logged, setLogged }}>
        <main>
          <Navbar />
          <div className={classes.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/standings" element={<Standings />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </AuthContext.Provider>
    </LeaguesCache.Provider>
  );
}
