export * from "@repetitive-ui/shadcn/checkbox/checkbox";
import {
  Checkbox,
  CheckboxProps,
} from "@repetitive-ui/shadcn/checkbox/checkbox";
import { cn } from "@repetitive-ui/utils";
import { Div } from "../div/Div";
import { Label } from "../label/Label";

type CheckboxWithTitleProps = Omit<CheckboxProps, "className"> & {
  title: string;
  className?: string;
  textClassName?: string;
  htmlFor?: string;
};

export const CheckboxWithTitle = ({
  title,
  className,
  textClassName,
  htmlFor,
  ...props
}: CheckboxWithTitleProps) => {
  return (
    <Div className={cn("flex items-center space-x-2", className)}>
      <Checkbox {...props} />
      <Label
        htmlFor={htmlFor}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          textClassName
        )}
      >
        {title}
      </Label>
    </Div>
  );
};
