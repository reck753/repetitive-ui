import {
  Button as ShadcnButton,
  ButtonProps as ShadcnButtonProps,
} from "@repetitive-ui/shadcn/button/button";

type ButtonProps = ShadcnButtonProps & {
  busy?: boolean;
};

export const Button = ({
  busy = false,
  disabled = false,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <ShadcnButton
      {...props}
      disabled={disabled || busy}
      onClick={
        onClick
          ? (e) => {
              if (!disabled && !busy) {
                onClick(e);
              }
            }
          : undefined
      }
    />
  );
};
