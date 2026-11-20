import { errors, getSeasonLength } from "../../../../shared";
import { AuthContext, LeaguesContext } from "../../App";
import { classes } from "../../constants/classes";
import BankrollText from "../../ui/BankrollText";
import Input from "../../ui/Input";
import { useContext, useState, type SubmitEvent } from "react";
import bankrollApiHandler from "../../api/handlers/bankroll";

export default function InitializeBankroll() {
  const [error, setError] = useState("");
  const [doubleCheck, setDoubleCheck] = useState(false);
  const { cache } = useContext(LeaguesContext);
  const { auth, setAuth } = useContext(AuthContext);
  const { bankroll } = classes;
  const standing = cache.serieA.standings;
  const { seasonLength } = getSeasonLength(standing);

  const label = "WEEKLY BUDGET";
  const tooMuch =
    "Really? Do you earn ten thousand euro in a month? C'mon dude!";
  const confirm =
    "Do you really earn that much? With that kind of money, you could buy a cruise for your whole family!";

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const budget = Number(formData.get("budget"));

    if (seasonLength === 0)
      return setError("Season is over. See you next year!");

    if (!budget || budget <= 0) return setError("Define your budget");

    if (budget >= 100) return setError(tooMuch);

    if (budget >= 50 && !doubleCheck) {
      setError(confirm);
      setDoubleCheck(true);
      return;
    }

    if (!auth || !auth.id) return setError(errors.login);

    const data = { id: auth.id, budget: budget * seasonLength };

    const res = await bankrollApiHandler(data);

    if (res.error) {
      setError(res.errorMessage);
      return;
    }

    setAuth(res.data);
  };
  return (
    <div className={bankroll.initialize}>
      <BankrollText />
      <form className={classes.match.updateForm} onSubmit={handleSubmit}>
        <Input type="number" htmlFor="budget" label={label} />
        <button type="submit">{doubleCheck ? "Confirm" : "Save"}</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}
