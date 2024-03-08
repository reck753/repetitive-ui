import { SVGAttributes } from "react";

type CircleProps = SVGAttributes<SVGCircleElement>;

export const Circle = ({ ...props }: CircleProps) => {
  return <circle {...props} />;
};
