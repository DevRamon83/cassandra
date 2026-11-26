interface Props {
  winPercentage: number;
  firstColor: string;
  secondColor: string;
  centerText: string;
}

export default function DonutChart({
  winPercentage,
  firstColor,
  secondColor,
  centerText,
}: Props) {
  return (
    <svg width="120" height="120" viewBox="0 0 32 32">
      <circle
        cx="16"
        cy="16"
        r="13.5"
        fill="transparent"
        stroke={firstColor}
        strokeWidth="4.5"
      />
      <circle
        cx="16"
        cy="16"
        r="13.5"
        fill="#fff"
        stroke={secondColor}
        strokeWidth="4.5"
        strokeDasharray={`${(winPercentage / 100) * 84.82} ${84.82 - (winPercentage / 100) * 84.82}`}
        strokeDashoffset="21.2"
      />
      <text
        x="16"
        y="16"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="5"
      >
        {centerText}
      </text>
    </svg>
  );
}
