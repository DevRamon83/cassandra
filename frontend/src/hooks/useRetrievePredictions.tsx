import {
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { leagues } from "../../../shared";
import getPredictions from "../api/handlers/getPredictions";
import { getPredictionsData } from "../helpers/getPredictionsData";
import { LeaguesContext, PredictionContext } from "../context";

export const useRetrievePredictions = (
  setReady: Dispatch<SetStateAction<string>>,
) => {
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
        return;
      }

      if (res.aborted) return;

      const context = getPredictionsData(cache, res.data);
      setPredictions(context);
      setReady("ready");
    };

    predictions();
    return () => controller.abort();
  }, [leaguesInCache, retry]);
};
