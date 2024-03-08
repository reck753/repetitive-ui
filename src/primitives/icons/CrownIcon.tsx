import { cn } from "@repetitive-ui/utils";
import { Svg } from "../svg/Svg";
import { Path } from "../svg/Path";

// Source: Lucide - Crown

type CrownIconProps = {
  className?: string;
};

export const CrownIcon = ({ className }: CrownIconProps) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn(["size-4 stroke-foreground", className])}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <Path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </Svg>
  );
};
