import { useContext, type Dispatch, type SetStateAction } from "react";
import { classes } from "../../constants/classes";
import type { BetSlipPool } from "../../typings/interfaces";
import Odds from "../../ui/Odds";
import newBet from "../../api/handlers/newBet";
import { errors, validateBet } from "../../../../shared";
import { AuthContext, BetsContext } from "../../context";
import BetRecap from "../../ui/BetRecap";
import { getMyBetData } from "../../helpers/getMyBetData";
import { useInitializeBetSlips } from "../../hooks/useInitializeBetSlips";

interface Props {
  betSlipPool: BetSlipPool[];
  oddHandler: (uuid: string, value: string) => void;
  removeHandler: (uuid: string) => void;
  weeks: number;
  setBetSlipPool: Dispatch<SetStateAction<BetSlipPool[]>>;
}

export default function BetSlip({
  betSlipPool,
  oddHandler,
  removeHandler,
  setBetSlipPool,
  weeks,
}: Props) {
  const { bets } = classes;
  const { auth } = useContext(AuthContext);
  const { userBets, setUserBets } = useContext(BetsContext);

  const budget = auth?.current_budget ?? 0;
  const maxStake = budget ? Math.round(budget / weeks) : 0;
  const odds: number[] = betSlipPool.map((bet) => Number(bet.odds));

  const { states, setters, handlerReset } = useInitializeBetSlips(
    setBetSlipPool,
    odds,
    maxStake,
  );

  const { stake, bonus, error, sendBtn } = states;
  const { setStake, setBonus, setSendBtn } = setters;

  const totalOdds = odds.reduce((acc, odd) => acc * odd, 1);
  const potentialWin = totalOdds * Number(stake) + Number(bonus);

  const sendHandler = async () => {
    if (sendBtn !== "send" || error) return;
    setSendBtn("wait");

    const yourBet = getMyBetData(betSlipPool);
    const data = { bonus: Number(bonus), stake: Number(stake), bet: yourBet };

    const isValidBet = validateBet(data);
    if (isValidBet.error) return handlerReset("send", errors.checkAgain, false);

    const res = await newBet(data);
    if (res.error) return handlerReset("send", errors.invalidStandard, false);

    if (userBets) setUserBets(null);
    handlerReset("send", "", true);
  };

  return (
    <div className={bets.betSlip}>
      {betSlipPool.map((match) => (
        <div key={`${match.uuid}`} className={bets.row}>
          <div className={bets.rowElement}>
            {match.homeTeam} Vs {match.awayTeam}:{" "}
            {match.uuid.replace(`${match.id}-`, "")}
          </div>
          <Odds
            value={match.odds}
            oddHandler={oddHandler}
            removeHandler={removeHandler}
            uuid={match.uuid}
          />
        </div>
      ))}
      {betSlipPool.length > 0 && (
        <>
          <BetRecap
            totalOdds={totalOdds}
            stake={stake}
            setStake={setStake}
            bonus={bonus}
            setBonus={setBonus}
            potentialWin={potentialWin}
            error={error}
          />

          <button className={bets.sendBtn} onClick={sendHandler}>
            {sendBtn}
          </button>
          {error && (
            <div className={bets.error}>
              <img src="/error.svg" />
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
}
