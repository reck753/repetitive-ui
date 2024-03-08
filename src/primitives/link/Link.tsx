import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";

type LinkProps = NextLinkProps & {
  children?: ReactNode;
  className?: string;
};

export const Link = ({ href, children, className }: LinkProps) => {
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
};
