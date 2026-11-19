import { useContext } from "react";
import { PredictionContext } from "../../App";
import ShowPredictions from "./ShowPredictions";
import { useRetrieveAllLeague } from "../../hooks/useRetrieveAllLeagues";
import { useRetrievePredictions } from "../../hooks/useRetrievePredictions";

export default function UserDashboard({ username }: { username: string }) {
  const { predictions } = useContext(PredictionContext);
  useRetrieveAllLeague();
  useRetrievePredictions();

  return (
    <>
      <h1>Hi {username}</h1>
      {predictions && <ShowPredictions predictions={predictions} />}
      <div>ciao</div>
    </>
  );
}
