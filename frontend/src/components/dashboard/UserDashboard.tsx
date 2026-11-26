import { useContext, useEffect, useState } from "react";
import PredictionsAndStats from "./PredictionsAndStats";
import { useRetrieveAllLeague } from "../../hooks/useRetrieveAllLeagues";
import { useRetrievePredictions } from "../../hooks/useRetrievePredictions";
import Bankroll from "./Bankroll";
import BetTracker from "./BetTracker";
import { getCurrentSeason, type SingleBet } from "../../../../shared";
import { AuthContext, PredictionContext } from "../../context";
import Spinner from "../../ui/Spinner";
import { classes } from "../../constants/classes";
import cassandraBets from "../../api/handlers/cassandraBets";

export default function UserDashboard({ username }: { username: string }) {
  const { predictions } = useContext(PredictionContext);
  const [ready, setReady] = useState("wait");
  const [cassandraSBets, setCassandraSBets] = useState<SingleBet[]>([]);
  useRetrieveAllLeague();
  useRetrievePredictions(setReady);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!predictions) return;
    const controller = new AbortController();

    const systemBets = async () => {
      const res = await cassandraBets(controller.signal);

      if (res.error && !res.aborted) {
        return;
      }

      if (res.aborted) return;
      setCassandraSBets(res.data);
    };

    systemBets();

    return () => controller.abort();
  }, [predictions]);

  const bankrollExist =
    auth?.initial_budget !== null && auth?.season === getCurrentSeason();

  const currentBet = cassandraSBets.filter((bet) => bet.won === null);
  const historyBet = cassandraSBets.filter((bet) => bet.won !== null);

  return (
    <>
      <h1 className={classes.dashboard.greeting}>Hi {username}</h1>
      {ready === "wait" ? (
        <Spinner />
      ) : (
        <>
          {predictions ? (
            <>
              <PredictionsAndStats
                predictions={predictions}
                cassandraBets={historyBet}
              />
              <Bankroll bankrollExist={bankrollExist} />
              {bankrollExist && <BetTracker cassandraBet={currentBet} />}
            </>
          ) : (
            <div>The new season is coming, see you soon</div>
          )}
        </>
      )}
    </>
  );
}
