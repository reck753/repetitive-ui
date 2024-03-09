import { ReactNode } from "react";
import { Div } from "@repetitive-ui/primitives/div/Div";
import { cn } from "@repetitive-ui/utils";
import { Button } from "@repetitive-ui/primitives/button/Button";
import { UnstyledButton } from "@repetitive-ui/primitives/button/UnstyledButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repetitive-ui/primitives/card/Card";
import { Span } from "@repetitive-ui/primitives/span/Span";

type SharedSubmitButtonProps = {
  children: ReactNode;
  className?: string;
  busy?: boolean;
  disabled?: boolean;
};

export const SharedSubmitButton = ({
  children,
  className,
  busy = false,
  disabled = false,
}: SharedSubmitButtonProps) => {
  return (
    <Div className={cn("flex justify-center", className)}>
      <Button
        className="w-full max-w-[224px]"
        disabled={disabled}
        busy={busy}
        type="submit"
      >
        {children}
      </Button>
    </Div>
  );
};

type SharedCardRootProps = {
  children: ReactNode;
};

export const SharedCardRoot = ({ children }: SharedCardRootProps) => {
  return (
    <Card className="border-none shadow-transparent pt-6 pb-10 px-6">
      {children}
    </Card>
  );
};

type SharedCardHeaderProps = {
  children: ReactNode;
};

export const SharedCardHeader = ({ children }: SharedCardHeaderProps) => {
  return <CardHeader className="space-y-1 pb-12">{children}</CardHeader>;
};

type SharedCardTitleProps = {
  children: ReactNode;
};

export const SharedCardTitle = ({ children }: SharedCardTitleProps) => {
  return <CardTitle className="text-2xl text-center">{children}</CardTitle>;
};

type SharedCardDescriptionProps = {
  children: ReactNode;
};

export const SharedCardDescription = ({
  children,
}: SharedCardDescriptionProps) => {
  return (
    <CardDescription className="text-center text-md">
      {children}
    </CardDescription>
  );
};

type SharedFooterActionProps = {
  title: string;
  action: string;
  onClick: () => void;
};

export const SharedFooterAction = ({
  title,
  action,
  onClick,
}: SharedFooterActionProps) => {
  return (
    <Span className="text-center text-sm">
      {title}
      <UnstyledButton className="font-medium underline" onClick={onClick}>
        {action}
      </UnstyledButton>
    </Span>
  );
};
