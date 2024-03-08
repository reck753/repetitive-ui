import { SVGAttributes } from "react";

type RectProps = SVGAttributes<SVGRectElement>;

export const Rect = ({ ...props }: RectProps) => {
  return <rect {...props} />;
};
