import { HTMLAttributes } from "react";

type NavProps = HTMLAttributes<HTMLDivElement>;

export const Nav = ({ children, ...props }: NavProps) => {
  return <nav {...props}>{children}</nav>;
};
