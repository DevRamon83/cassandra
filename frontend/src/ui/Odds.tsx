import { classes } from "../constants/classes";

interface Props {
  value: string;
  oddHandler: (uuid: string, value: string) => void;
  uuid: string;
  removeHandler: (uuid: string) => void;
}

export default function Odds({
  value,
  oddHandler,
  uuid,
  removeHandler,
}: Props) {
  const { bets } = classes;

  return (
    <div className={bets.rowElement}>
      <input
        type="number"
        step="0.01"
        min="1"
        placeholder="Odds"
        value={value}
        onChange={(e) => oddHandler(uuid, e.target.value)}
      />
      <button type="button" onClick={() => removeHandler(uuid)}>
        <img src="/trash.svg" />
      </button>
    </div>
  );
}
