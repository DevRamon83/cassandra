import { useContext } from "react";
import { getSeasonLength } from "../../../../shared";
import InitializeBankroll from "./InitializeBankroll";
import { classes } from "../../constants/classes";
import { AuthContext, LeaguesContext } from "../../context";

interface Props {
  bankrollExist: boolean;
}

export default function Bankroll({ bankrollExist }: Props) {
  const { auth } = useContext(AuthContext);
  const { cache } = useContext(LeaguesContext);
  const standing = cache.serieA.standings;
  const { seasonLength } = getSeasonLength(standing);

  const { bankroll } = classes;

  return (
    <>
      {bankrollExist && auth ? (
        <div className={bankroll.account}>
          <div className={bankroll.row}>
            Initial budget: {auth.initial_budget}€
          </div>
          <div className={bankroll.row}>
            Actual budget: {auth.current_budget}€
          </div>
          <div className={bankroll.row}>
            Weekly budget: {Math.round(auth.current_budget! / seasonLength)}€
          </div>
        </div>
      ) : (
        <InitializeBankroll />
      )}
    </>
  );
}
