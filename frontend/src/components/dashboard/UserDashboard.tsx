import { useContext, useEffect, useState } from "react";
import getPredictions from "../../api/handlers/getPredictions";
import { LeaguesContext, PredictionCache } from "../../App";
import { retrieveLeagues } from "../../services/retrieveLeagues";
import { leagues } from "../../../../shared";
import { getPredictionsData } from "../../helpers/getPredictionsData";

export default function UserDashboard({ username }: { username: string }) {
  const { cache, setCache } = useContext(LeaguesContext);
  const { predictions, setPredictions } = useContext(PredictionCache);
  const leaguesInCache: string[] = Object.keys(cache);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const data = async () => {
      const res = await retrieveLeagues(
        leaguesInCache,
        setCache,
        controller.signal,
      );

      if (res.error && !res.aborted) {
        retry < 3 && setRetry((prev) => prev + 1);
      }
    };

    if (leagues.length !== leaguesInCache.length) {
      data();
    }

    return () => controller.abort();
  }, [retry]);

  useEffect(() => {
    if (leagues.length !== leaguesInCache.length) return;
    const controller = new AbortController();

    const predictions = async () => {
      const resp = await getPredictions(controller.signal);
      if (resp.error) {
        // error handler
        return;
      }

      getPredictionsData(cache, resp.data, setPredictions);

      //   console.log("predictions ", resp.data);
    };

    predictions();
    return () => controller.abort();
  }, [leaguesInCache]);

  return (
    <>
      <h1>Hi {username}</h1>
    </>
  );
}
