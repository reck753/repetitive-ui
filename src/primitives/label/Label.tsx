import { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ children, ...props }: LabelProps) => {
  return <label {...props}>{children}</label>;
};
