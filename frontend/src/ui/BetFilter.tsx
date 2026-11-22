import type { Dispatch, SetStateAction } from "react";

interface Props {
  value: string;
  setter: Dispatch<SetStateAction<string>>;
}

export default function BetFilter({ value, setter }: Props) {
  return (
    <select value={value} onChange={(e) => setter(e.target.value)}>
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="won">Won</option>
      <option value="lost">Lost</option>
    </select>
  );
}
