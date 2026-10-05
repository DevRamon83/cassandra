interface rowProps {
  logo: string;
  team: string;
  goal: number | string;
}

export default function SingleMatchRow({ logo, team, goal }: rowProps) {
  return (
    <div className="match__row">
      <img src={logo} /> {team} {goal}
    </div>
  );
}
