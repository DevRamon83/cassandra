import type { SingleBet } from "../../../../../shared";
import type { PredictionUI, StatsCounts } from "../../../typings/interfaces";
import CassandraChart from "./CassandraChart";
import LeaguesChart from "./LeaguesChart";
import PredictionsChart from "./PredictionsChart";

interface Props {
  market: string;
  league: string;
  predictionMarket: string;
  allPredictions: PredictionUI[];
  data: Record<string, StatsCounts>;
  cassandraBets: SingleBet[];
}

export default function OverviewChartsContainer({
  market,
  data,
  league,
  allPredictions,
  predictionMarket,
  cassandraBets,
}: Props) {
  return (
    <>
      <LeaguesChart market={market} data={data} league={league} />
      <PredictionsChart
        market={market}
        allPredictions={allPredictions}
        league={league}
        predictionMarket={predictionMarket}
      />
      <CassandraChart cassandraBets={cassandraBets} />
    </>
  );
}
