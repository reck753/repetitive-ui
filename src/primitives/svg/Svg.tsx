import { SVGAttributes } from "react";

type SvgProps = SVGAttributes<SVGElement>;

export const Svg = ({ ...props }: SvgProps) => {
  return <svg {...props} />;
};
