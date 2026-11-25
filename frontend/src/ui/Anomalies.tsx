import { classes } from "../constants/classes";
import type { StatsCounts } from "../typings/interfaces";

interface Props {
  anomalies: number;
  league: string;
  data: StatsCounts;
  tolerance: number;
}

const zeroHeader =
  "No anomalies found. Try another league or increase the tolerance.";

const someAnomaliesHeader = (anomalies: number) => {
  return `${anomalies} ${anomalies === 1 ? "anomaly" : "anomalies"} found across all leagues. Select a specific league to view details.`;
};

const detailsHeader = (anomalies: number, league: string) => {
  return `${anomalies} ${anomalies === 1 ? "anomaly" : "anomalies"} found in ${league}:`;
};

export default function Anomalies({
  anomalies,
  league,
  data,
  tolerance,
}: Props) {
  const someAnomalies = league === "all" && anomalies > 0;
  const anomaliesInLeague = league !== "all" && anomalies > 0;

  const matchesForRound =
    league === "ligue1" || league === "bundesliga" ? 9 : 10;

  const { stats } = classes;

  return (
    <div className="stats__anomalies">
      {anomalies === 0 && <h4>{zeroHeader}</h4>}
      {someAnomalies && <h4>{someAnomaliesHeader(anomalies)}</h4>}
      {anomaliesInLeague && (
        <>
          <h4>{detailsHeader(anomalies, league)}</h4>

          {data.allSame.gameWeeks.map((gameWeek, index) => (
            <div
              className={stats.anomalyCard}
              key={`${gameWeek}_${data.allSame.outcomes[index]}`}
            >
              <div className="stats__round">ROUND {gameWeek}</div>
              <div className="stats__outcome">
                {data.allSame.outcomes[index]}
              </div>
              <div className="stats__frequency">
                {matchesForRound - tolerance}/{matchesForRound}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
