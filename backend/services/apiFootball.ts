import type { Interfaces } from "../../shared/index.ts";

const defineLeague = (league: string) => {
  switch (league) {
    case "serieA":
      return "it.1";

    default:
      return null;
  }
};

export async function apiFootball(data: Interfaces.GameWeek) {
  const { league, season } = data;
  const mySeason = season.substring(0, 4) + "-" + season.substring(7, 9);

  const myLeague = defineLeague(league);
  const baseUrl =
    "https://raw.githubusercontent.com/openfootball/football.json/master";
  const endpoint = `${mySeason}/${myLeague}.json`;

  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return { error: true, errorMsg: "noResponse" };
    }

    const data = await response.json();

    return { error: false, data };
  } catch (err) {
    const error = err as Error;
    return { error: true, errorMsg: error.message };
  }
}
