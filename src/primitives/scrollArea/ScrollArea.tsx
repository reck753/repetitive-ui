import { ReactNode } from "react";
import {
  ScrollArea as ShadcnScrollArea,
  ScrollBar,
} from "@repetitive-ui/shadcn/scroll-area/scroll-area";

type Orientation = "vertical" | "horizontal";

type ScrollComponentProps = {
  orientation?: Orientation;
  className?: string;
  children: ReactNode;
};

export const ScrollArea = ({
  orientation = "vertical",
  className,
  children,
}: ScrollComponentProps) => (
  <ShadcnScrollArea className={className}>
    {children}
    <ScrollBar orientation={orientation} />
  </ShadcnScrollArea>
);
