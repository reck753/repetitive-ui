import {
  Input as ShadcnInput,
  InputProps as ShadcnInputProps,
} from "@repetitive-ui/shadcn/input/input";

type InputProps = Omit<ShadcnInputProps, "onChange"> & {
  onChange?: (value: string) => void;
};

export const Input = ({ onChange, ...props }: InputProps) => {
  return (
    <ShadcnInput
      {...props}
      onChange={
        onChange
          ? (e) => {
              e.preventDefault();
              onChange(e.target.value);
            }
          : undefined
      }
    />
  );
};
