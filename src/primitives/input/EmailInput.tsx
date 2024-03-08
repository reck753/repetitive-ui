import { Input } from "./Input";

type EmailInputProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

export const EmailInput = ({
  value,
  onChange,
  placeholder = "Email",
  autoFocus,
  className,
}: EmailInputProps) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
      type="email"
      className={className}
    />
  );
};
