import { classes } from "../constants/classes";

interface Props {
  market: string;
  percentage: number;
}

export default function Legend({ market, percentage }: Props) {
  const { stats } = classes;
  return (
    <div className={stats.legend}>
      <div className={`${stats.base}${market}`} />
      {market} {percentage}%
    </div>
  );
}
