import { HTMLAttributes } from "react";

type DivProps = HTMLAttributes<HTMLDivElement>;

export const Div = ({ children, ...props }: DivProps) => {
  return <div {...props}>{children}</div>;
};
