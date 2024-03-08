import { SVGAttributes } from "react";

type PolygonProps = SVGAttributes<SVGPolygonElement>;

export const Polygon = ({ ...props }: PolygonProps) => {
  return <polygon {...props} />;
};
