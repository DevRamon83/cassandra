import { columns } from "../../../shared/index";

interface ClassInterface {
  classColumn: string;
}

export default function LeagueStandingsColumn({ classColumn }: ClassInterface) {
  return (
    <div className={classColumn}>
      {columns.map((value) => (
        <div key={value}>{value}</div>
      ))}
    </div>
  );
}
