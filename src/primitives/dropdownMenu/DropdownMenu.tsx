export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@repetitive-ui/shadcn/dropdown-menu/dropdown-menu";
import { DropdownMenuTrigger as ShadcnDropdownMenuTrigger } from "@repetitive-ui/shadcn/dropdown-menu/dropdown-menu";
import { cn } from "@repetitive-ui/utils";
import { ComponentPropsWithoutRef } from "react";

type DropdownMenuTriggerProps = ComponentPropsWithoutRef<
  typeof ShadcnDropdownMenuTrigger
>;

export const DropdownMenuTrigger = ({
  className,
  ...props
}: DropdownMenuTriggerProps) => {
  return (
    <ShadcnDropdownMenuTrigger
      className={cn("focus-visible:outline-none", className)}
      {...props}
    />
  );
};
