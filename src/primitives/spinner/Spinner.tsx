import { cn } from "@repetitive-ui/utils";
import { Svg } from "../svg/Svg";
import { Path } from "../svg/Path";
import { Circle } from "../svg/Circle";

type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => (
  <Svg
    className={cn(`animate-spin w-5 h-5 text-white`, className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <Circle
      className="opacity-25 stroke-primary"
      cx="12"
      cy="12"
      r="10"
      strokeWidth="4"
    />
    <Path
      className="opacity-75 fill-primary"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </Svg>
);
