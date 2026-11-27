import { OUTCOME_COLORS } from "../../../shared";
import { classes } from "../constants/classes";

type Props = {
  firstValue: number;
  secondValue: number;
};

export default function StackedBar({ firstValue, secondValue }: Props) {
  const safeFirst = Number.isFinite(firstValue) ? firstValue : 0;
  const safeSecond = Number.isFinite(secondValue) ? secondValue : 0;

  const leftWidth = Math.max(0, Math.min(100, safeFirst));
  const rightWidth = Math.max(0, Math.min(100, safeSecond));
  const { charts } = classes.stats;
  const firstColor = OUTCOME_COLORS.won;
  const secondColor = OUTCOME_COLORS.lost;

  return (
    <>
      <svg
        className={charts.stacked}
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <rect
          className={charts.firstRect}
          x={0}
          y={0}
          width={leftWidth}
          fill={firstColor}
        />

        <rect
          className={charts.secondRect}
          x={leftWidth}
          y={0}
          width={rightWidth}
          fill={secondColor}
        />
      </svg>
    </>
  );
}
