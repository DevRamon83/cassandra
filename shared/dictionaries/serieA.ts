interface TeamData {
  cleanName: string;
  city: string;
}

export const serieA: Record<string, TeamData> = {
  "SS Lazio": { cleanName: "Lazio", city: "Roma" },
  "Cagliari Calcio": { cleanName: "Cagliari", city: "Cagliari" },
  "FC Internazionale Milano": { cleanName: "Inter", city: "Milano" },
  "AC Milan": { cleanName: "Milan", city: "Milano" },
  "Juventus FC": { cleanName: "Juventus", city: "Torino" },
  "AS Roma": { cleanName: "Roma", city: "Roma" },
  "ACF Fiorentina": { cleanName: "Fiorentina", city: "Firenze" },
  "SSC Napoli": { cleanName: "Napoli", city: "Napoli" },
  "Atalanta BC": { cleanName: "Atalanta", city: "Bergamo" },
  "Torino FC": { cleanName: "Torino", city: "Torino" },
  "Bologna FC 1909": { cleanName: "Bologna", city: "Bologna" },
  "Udinese Calcio": { cleanName: "Udinese", city: "Udine" },
  "Como 1907": { cleanName: "Como", city: "Como" },
  "AC Monza": { cleanName: "Monza", city: "Monza" },
  "Genoa CFC": { cleanName: "Genoa", city: "Genova" },
  "Parma Calcio 1913": { cleanName: "Parma", city: "Parma" },
  "Frosinone Calcio": { cleanName: "Frosinone", city: "Frosinone" },
  "Venezia FC": { cleanName: "Venezia", city: "Venezia" },
  "US Lecce": { cleanName: "Lecce", city: "Lecce" },
  "US Sassuolo Calcio": { cleanName: "Sassuolo", city: "Sassuolo" },
};

export function getSerieATeamName(rawName: string): TeamData | null {
  return serieA[rawName] || null;
}
