import { HTMLAttributes } from "react";

type SpanProps = HTMLAttributes<HTMLSpanElement>;

export const Span = ({ children, ...props }: SpanProps) => {
  return <span {...props}>{children}</span>;
};
