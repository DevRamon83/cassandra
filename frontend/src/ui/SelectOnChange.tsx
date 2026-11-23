import type { Dispatch, SetStateAction } from "react";

interface Props {
  value: string;
  setter: Dispatch<SetStateAction<string>>;
  data: Record<string, string>;
}

export default function SelectOnChange({ value, setter, data }: Props) {
  return (
    <select value={value} onChange={(e) => setter(e.target.value)}>
      {Object.entries(data).map(([optionValue, label]) => (
        <option key={optionValue} value={optionValue}>
          {label}
        </option>
      ))}
    </select>
  );
}
