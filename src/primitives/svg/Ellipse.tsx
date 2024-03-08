import { SVGAttributes } from "react";

type EllipseProps = SVGAttributes<SVGEllipseElement>;

export const Ellipse = ({ ...props }: EllipseProps) => {
  return <ellipse {...props} />;
};
