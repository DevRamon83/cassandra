import { useContext } from "react";
import { AuthContext, LeaguesContext } from "../../App";
import { getCurrentSeason, getSeasonLength } from "../../../../shared";
import InitializeBankroll from "./InitializeBankroll";
import { classes } from "../../constants/classes";

export default function Bankroll() {
  const { auth } = useContext(AuthContext);
  const { cache } = useContext(LeaguesContext);
  const standing = cache.serieA.standings;
  const { seasonLength } = getSeasonLength(standing);

  const bankrollExist =
    auth?.initial_budget !== null && auth?.season === getCurrentSeason();

  const { bankroll } = classes;

  return (
    <>
      {bankrollExist ? (
        <div className={bankroll.account}>
          <div className={bankroll.row}>
            Initial budget: {auth.initial_budget}€
          </div>
          <div className={bankroll.row}>
            Actual budget: {auth.current_budget}€
          </div>
          <div className={bankroll.row}>
            Weekly budget: {auth.current_budget! / seasonLength}€
          </div>
        </div>
      ) : (
        <InitializeBankroll />
      )}
    </>
  );
}
