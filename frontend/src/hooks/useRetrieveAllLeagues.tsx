import { useContext, useEffect, useState } from "react";
import { retrieveLeagues } from "../services/retrieveLeagues";
import { leagues } from "../../../shared";
import { LeaguesContext } from "../context";

export const useRetrieveAllLeague = () => {
  const [retry, setRetry] = useState(0);
  const { cache, setCache } = useContext(LeaguesContext);

  const leaguesInCache: string[] = Object.keys(cache);

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
};
