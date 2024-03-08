import { cn } from "@repetitive-ui/utils";
import { Skeleton } from "../skeleton/Skeleton";

export * from "@repetitive-ui/shadcn/avatar/avatar";

type AvatarLoadingProps = {
  className?: string;
};

export const AvatarLoading = ({ className }: AvatarLoadingProps) => {
  return <Skeleton className={cn(["size-10 rounded-full", className])} />;
};
