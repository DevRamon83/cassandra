interface TeamData {
  cleanName: string;
  city: string;
}

export const liga: Record<string, TeamData> = {
  "Rayo Vallecano de Madrid": { cleanName: "Rayo Vallecano", city: "Madrid" },
  "Deportivo Alavés": { cleanName: "Alavés", city: "Vitoria-Gasteiz" },
  "Real Betis Balompié": { cleanName: "Real Betis", city: "Sevilla" },
  "Real Sociedad de Fútbol": {
    cleanName: "Real Sociedad",
    city: "San Sebastián",
  },
  "Athletic Club": { cleanName: "Athletic", city: "Bilbao" },
  "Sevilla FC": { cleanName: "Sevilla", city: "Sevilla" },
  "Valencia CF": { cleanName: "Valencia", city: "Valencia" },
  "RC Celta de Vigo": { cleanName: "Celta Vigo", city: "Vigo" },
  "RCD Espanyol de Barcelona": { cleanName: "Espanyol", city: "Barcelona" },
  "Real Madrid CF": { cleanName: "Real Madrid", city: "Madrid" },
  "Club Atlético de Madrid": { cleanName: "Atlético Madrid", city: "Madrid" },
  "Villarreal CF": { cleanName: "Villarreal", city: "Villarreal" },
  "Getafe CF": { cleanName: "Getafe", city: "Getafe" },
  "Real Racing Club de Santander": {
    cleanName: "Racing Santander",
    city: "Santander",
  },
  "Elche CF": { cleanName: "Elche", city: "Elche" },
  "FC Barcelona": { cleanName: "Barcelona", city: "Barcelona" },
  "CA Osasuna": { cleanName: "Osasuna", city: "Pamplona" },
  "Levante UD": { cleanName: "Levante", city: "Valencia" },
  "Málaga CF": { cleanName: "Málaga", city: "Málaga" },
  "RC Deportivo La Coruña": {
    cleanName: "Deportivo La Coruña",
    city: "A Coruña",
  },
};

export function getLigaTeamName(rawName: string): TeamData | null {
  return liga[rawName] || null;
}
