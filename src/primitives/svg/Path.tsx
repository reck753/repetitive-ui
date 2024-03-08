import { SVGAttributes } from "react";

type PathProps = SVGAttributes<SVGPathElement>;

export const Path = ({ ...props }: PathProps) => {
  return <path {...props} />;
};
