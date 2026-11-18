import { useContext, useEffect, useState } from "react";
import { leagues } from "../../../shared";
import getPredictions from "../api/handlers/getPredictions";
import { getPredictionsData } from "../helpers/getPredictionsData";
import { LeaguesContext, PredictionContext } from "../App";

export const useRetrievePredictions = () => {
  const [retry, setRetry] = useState(0);

  const { setPredictions } = useContext(PredictionContext);
  const { cache } = useContext(LeaguesContext);

  const leaguesInCache: string[] = Object.keys(cache);

  useEffect(() => {
    if (leagues.length !== leaguesInCache.length) return;
    const controller = new AbortController();

    const predictions = async () => {
      const res = await getPredictions(controller.signal);

      if (res.error && !res.aborted) {
        retry < 3 && setRetry((prev) => prev + 1);
      }

      getPredictionsData(cache, res.data, setPredictions);
    };

    predictions();
    return () => controller.abort();
  }, [leaguesInCache, retry]);
};
