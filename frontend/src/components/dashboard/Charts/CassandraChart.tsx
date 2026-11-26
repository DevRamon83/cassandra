import type { SingleBet } from "../../../../../shared";
import { classes } from "../../../constants/classes";
import { cassandraData } from "../../../helpers/cassandraData";
import ChartPanel from "../../../ui/ChartPanel";

interface Props {
  cassandraBets: SingleBet[];
}

export default function CassandraChart({ cassandraBets }: Props) {
  const { stats } = classes;
  const { cassandraWinnings, total, balance } = cassandraData(cassandraBets);

  return (
    <div className={stats.leaguesContainer}>
      <h4>
        Cassandra bet {total} {total === 1 ? "time" : "times"}
      </h4>
      <ChartPanel
        percentage={cassandraWinnings}
        caller="cassandra"
        balance={balance}
      />
    </div>
  );
}
