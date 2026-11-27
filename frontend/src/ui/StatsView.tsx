import { classes } from "../constants/classes";

interface Props {
  viewHandler: (value: string) => void;
  view: string;
}

export default function StatsView({ viewHandler, view }: Props) {
  const { stats } = classes;
  return (
    <div className={stats.view}>
      <button
        onClick={() => viewHandler("overview")}
        className={`${stats.viewBtn}${view === "overview" ? "-active" : ""}`}
      >
        overview
      </button>
      <button
        onClick={() => viewHandler("team")}
        className={`${stats.viewBtn}${view === "team" ? "-active" : ""}`}
      >
        by team
      </button>
    </div>
  );
}
