import { classes } from "../constants/classes";

interface RowProps {
  team: string;
  goal: number | string;
}

export default function SingleMatchRow({ team, goal }: RowProps) {
  const logo = `/teams/${team}.jpg`;
  return (
    <div className={classes.match.row}>
      <img src={logo} /> <div className={classes.match.team}>{team}</div>
      <div>{goal}</div>
    </div>
  );
}
