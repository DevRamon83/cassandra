import { useContext, useState } from "react";
import ShowPredictions from "./ShowPredictions";
import { useRetrieveAllLeague } from "../../hooks/useRetrieveAllLeagues";
import { useRetrievePredictions } from "../../hooks/useRetrievePredictions";
import Bankroll from "./Bankroll";
import BetTracker from "./BetTracker";
import { getCurrentSeason } from "../../../../shared";
import { AuthContext, PredictionContext } from "../../context";
import Spinner from "../../ui/Spinner";

export default function UserDashboard({ username }: { username: string }) {
  const { predictions } = useContext(PredictionContext);
  const [ready, setReady] = useState("wait");
  useRetrieveAllLeague();
  useRetrievePredictions(setReady);
  const { auth } = useContext(AuthContext);

  const bankrollExist =
    auth?.initial_budget !== null && auth?.season === getCurrentSeason();
  return (
    <>
      <h1>Hi {username}</h1>
      {ready === "wait" ? (
        <Spinner />
      ) : (
        <>
          {predictions ? (
            <>
              <ShowPredictions predictions={predictions} />
              <Bankroll bankrollExist={bankrollExist} />
              {bankrollExist && <BetTracker />}
            </>
          ) : (
            <div>The new season is coming, see you soon</div>
          )}
        </>
      )}
    </>
  );
}
