import { classes } from "../constants/classes";

interface rowProps {
  team: string;
  goal: number | string;
}

export default function SingleMatchRow({ team, goal }: rowProps) {
  const logo = `/teams/${team}.jpg`;
  return (
    <div className={classes.match.row}>
      <img src={logo} /> <div className={classes.match.team}>{team}</div>
      <div>{goal}</div>
    </div>
  );
}
