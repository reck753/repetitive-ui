import { LinkHTMLAttributes } from "react";

type ExternalLinkProps = LinkHTMLAttributes<HTMLAnchorElement>;

export const ExternalLink = ({ ...props }: ExternalLinkProps) => {
  return <a {...props} target="_blank" rel="noopener noreferrer" />;
};
