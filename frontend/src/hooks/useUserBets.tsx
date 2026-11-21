import { useContext, useEffect, useState } from "react";
import { BetsContext } from "../context";
import allBets from "../api/handlers/allBets";

export const useUserBets = () => {
  const { userBets, setUserBets } = useContext(BetsContext);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (userBets !== null) return;
    const controller = new AbortController();

    const fetchBets = async () => {
      const res = await allBets(controller.signal);

      if (res.error && !res.aborted) {
        retry < 3 && setRetry((prev) => prev + 1);
        return;
      }

      if (res.aborted) return;

      setUserBets(res.data);
    };

    fetchBets();

    return () => controller.abort();
  }, [retry]);
};
