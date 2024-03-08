import { cn } from "@repetitive-ui/utils";
import { Svg } from "../svg/Svg";
import { Rect } from "../svg/Rect";
import { Path } from "../svg/Path";
import { Circle } from "../svg/Circle";

// Source: Ionicons - Calendar

type CalendarIconProps = {
  className?: string;
};

export const CalendarIcon = ({ className }: CalendarIconProps) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn(["size-4", className])}
    >
      <Rect
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
        x="48"
        y="80"
        width="416"
        height="384"
        rx="48"
      />
      <Circle cx="296" cy="232" r="24" />
      <Circle cx="376" cy="232" r="24" />
      <Circle cx="296" cy="312" r="24" />
      <Circle cx="376" cy="312" r="24" />
      <Circle cx="136" cy="312" r="24" />
      <Circle cx="216" cy="312" r="24" />
      <Circle cx="136" cy="392" r="24" />
      <Circle cx="216" cy="392" r="24" />
      <Circle cx="296" cy="392" r="24" />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
        strokeLinecap="round"
        d="M128 48v32M384 48v32"
      />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M464 160H48"
      />
    </Svg>
  );
};
