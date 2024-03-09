import { Input } from "./Input";

type EmailInputProps = {
  name?: string | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange?: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

export const EmailInput = ({
  name,
  value,
  defaultValue,
  onChange,
  placeholder = "Email",
  autoFocus,
  className,
}: EmailInputProps) => {
  return (
    <Input
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
      type="email"
      className={className}
    />
  );
};
