interface PieProps {
  winPercentage: number;
  firstColor: string;
  secondColor: string;
}

export default function Chart({
  winPercentage,
  firstColor,
  secondColor,
}: PieProps) {
  return (
    <svg width="120" height="120" viewBox="0 0 32 32">
      <circle
        cx="16"
        cy="16"
        r="7.957"
        fill="transparent"
        stroke={firstColor}
        strokeWidth="15.915"
      />
      <circle
        cx="16"
        cy="16"
        r="7.957"
        fill="transparent"
        stroke={secondColor}
        strokeWidth="15.915"
        strokeDasharray={`${winPercentage / 2} ${50 - winPercentage / 2}`}
        strokeDashoffset="12.5"
      />
    </svg>
  );
}
