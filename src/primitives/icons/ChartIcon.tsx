import { cn } from "@repetitive-ui/utils";
import { Svg } from "../svg/Svg";
import { Rect } from "../svg/Rect";

// Source: Ionicons - Stats-Chart

type ChartIconProps = {
  className?: string;
};

export const ChartIcon = ({ className }: ChartIconProps) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn(["size-4", className])}
    >
      <Rect
        x="64"
        y="320"
        width="48"
        height="160"
        rx="8"
        ry="8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <Rect
        x="288"
        y="224"
        width="48"
        height="256"
        rx="8"
        ry="8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <Rect
        x="400"
        y="112"
        width="48"
        height="368"
        rx="8"
        ry="8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <Rect
        x="176"
        y="32"
        width="48"
        height="448"
        rx="8"
        ry="8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </Svg>
  );
};
