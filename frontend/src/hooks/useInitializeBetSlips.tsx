import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { BetSlipPool } from "../typings/interfaces";
import { errors } from "../../../shared";

export const useInitializeBetSlips = (
  setBetSlipPool: Dispatch<SetStateAction<BetSlipPool[]>>,
  odds: number[],
  maxStake: number,
) => {
  const [stake, setStake] = useState("");
  const [bonus, setBonus] = useState("");
  const [error, setError] = useState("");
  const [sendBtn, setSendBtn] = useState("send");

  const states = { stake, bonus, error, sendBtn };
  const setters = { setStake, setBonus, setSendBtn };

  useEffect(() => {
    const invalidStake = Number(stake) > maxStake;
    if (odds.some((odd) => odd <= 1)) return setError(errors.fillTheOdd);
    if (invalidStake) return setError(`${errors.invalidBudget}${maxStake}€`);
    setError("");
  }, [odds, stake, maxStake]);

  const handlerReset = (btn: string, err: string, reset: boolean) => {
    setSendBtn(btn);
    setError(err);

    if (reset) {
      setBonus("");
      setStake("");
      setBetSlipPool([]);
    }
  };

  return { states, setters, handlerReset };
};
