import { columns } from "../../../shared/index";

interface classInterface {
  classColumn: string;
}

export default function LeagueStandingsColumn({ classColumn }: classInterface) {
  return (
    <div className={classColumn}>
      {columns.map((value) => (
        <div key={value}>{value}</div>
      ))}
    </div>
  );
}
